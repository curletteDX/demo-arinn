#!/usr/bin/env node
/**
 * Update Uniform Entries with Assets using MCP Tools
 *
 * This script uses Uniform MCP tools to update entries with assets.
 * Since MCP tools can't directly set asset values, this script will:
 * 1. Find assets by filename
 * 2. Provide instructions for manual updates
 * 3. Or use entryAction with fieldUpdates (if supported)
 *
 * Usage:
 *   npm run update-entries-mcp
 */

import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';
import { resolve } from 'path';
import * as yaml from 'js-yaml';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

interface ImageMapping {
  filename: string;
  path: string;
  size: number;
  suggestedProduct: string | null;
  entryId: string | null;
}

interface MappingData {
  images: ImageMapping[];
}

interface AssetInfo {
  id: string;
  filename: string;
  url?: string;
}

async function findAssetByFilename(filename: string): Promise<AssetInfo | null> {
  const assetDir = path.join(process.cwd(), 'uniform-data', 'asset');
  if (!fs.existsSync(assetDir)) {
    return null;
  }

  const assetFiles = fs.readdirSync(assetDir).filter(f => f.endsWith('.yaml'));

  for (const assetFile of assetFiles) {
    try {
      const assetPath = path.join(assetDir, assetFile);
      const assetContent = fs.readFileSync(assetPath, 'utf-8');
      const assetData = yaml.load(assetContent) as any;
      const asset = assetData?.asset;

      if (!asset) continue;

      const assetId = asset._id || path.basename(assetFile, '.yaml');
      const assetTitle = asset.fields?.title?.value || '';
      const assetUrl = asset.fields?.url?.value || '';

      if (assetTitle) {
        const filenameBase = filename.toLowerCase().replace(/\.[^/.]+$/, '');
        const assetTitleLower = assetTitle.toLowerCase().replace(/\.[^/.]+$/, '');

        // Exact match
        if (filenameBase === assetTitleLower ||
            filenameBase.replace(/-/g, '') === assetTitleLower.replace(/-/g, '')) {
          return { id: assetId, filename: assetTitle, url: assetUrl };
        }

        // Partial match
        const filenameParts = filenameBase.split('-').filter((p: string) => p.length > 2);
        const assetParts = assetTitleLower.split('-').filter((p: string) => p.length > 2);
        const matchingParts = filenameParts.filter((fp: string) =>
          assetParts.some((ap: string) => ap.includes(fp) || fp.includes(ap))
        ).length;

        if (matchingParts > 0 && matchingParts / Math.max(filenameParts.length, assetParts.length) >= 0.5) {
          return { id: assetId, filename: assetTitle, url: assetUrl };
        }
      }
    } catch (error) {
      continue;
    }
  }

  return null;
}

async function main() {
  console.log('🚀 Starting entry update process (MCP approach)...\n');

  const mappingFile = path.join(process.cwd(), 'image-mapping.json');
  if (!fs.existsSync(mappingFile)) {
    throw new Error(`Mapping file not found: ${mappingFile}`);
  }

  const data: MappingData = JSON.parse(fs.readFileSync(mappingFile, 'utf-8'));
  const mappings = data.images.filter(img => img.entryId);

  console.log(`📋 Found ${mappings.length} image mappings\n`);

  // Group by entry
  const entryGroups: Record<string, ImageMapping[]> = {};
  mappings.forEach(mapping => {
    if (mapping.entryId) {
      if (!entryGroups[mapping.entryId]) {
        entryGroups[mapping.entryId] = [];
      }
      entryGroups[mapping.entryId].push(mapping);
    }
  });

  console.log(`📦 Processing ${Object.keys(entryGroups).length} unique entries\n`);

  const updates: Array<{
    entryId: string;
    entryName: string;
    assetId: string;
    assetFilename: string;
    imageFilename: string;
  }> = [];

  for (const [entryId, images] of Object.entries(entryGroups)) {
    const productName = images[0].suggestedProduct || 'Unknown';
    const image = images[0]; // Use first image

    console.log(`📝 ${productName}`);
    console.log(`   Entry ID: ${entryId}`);
    console.log(`   Image: ${image.filename}`);

    const asset = await findAssetByFilename(image.filename);

    if (asset) {
      console.log(`   ✅ Found asset: ${asset.id} (${asset.filename})`);
      updates.push({
        entryId,
        entryName: productName,
        assetId: asset.id,
        assetFilename: asset.filename,
        imageFilename: image.filename,
      });
    } else {
      console.log(`   ⚠️  Asset not found for: ${image.filename}`);
    }
    console.log('');
  }

  console.log('═'.repeat(60));
  console.log('📊 SUMMARY');
  console.log('═'.repeat(60));
  console.log(`✅ Found assets for: ${updates.length} entries`);
  console.log(`⚠️  Missing assets: ${Object.keys(entryGroups).length - updates.length} entries\n`);

  if (updates.length > 0) {
    console.log('💡 NOTE: Uniform MCP tools cannot directly set asset values.');
    console.log('   However, you can use the Uniform Management API or UI.\n');
    console.log('📋 UPDATE INSTRUCTIONS:\n');

    // Generate update instructions
    const instructionsFile = path.join(process.cwd(), 'update-instructions.json');
    fs.writeFileSync(instructionsFile, JSON.stringify({
      updates,
      instructions: [
        'These updates need to be done via Uniform Management API or UI',
        'Each entry needs its image field updated with the corresponding asset ID',
        'Format: { entryId, assetId }',
      ],
    }, null, 2));

    console.log(`✅ Generated update instructions: ${instructionsFile}\n`);
    console.log('📋 Updates needed:\n');

    updates.forEach((update, index) => {
      console.log(`${index + 1}. ${update.entryName}`);
      console.log(`   Entry ID: ${update.entryId}`);
      console.log(`   Asset ID: ${update.assetId}`);
      console.log(`   Asset: ${update.assetFilename}`);
      console.log('');
    });

    console.log('💡 To update via API, use:');
    console.log('   PUT /api/v1/projects/{projectId}/entries/{entryId}');
    console.log('   Body: { fields: { image: { type: "asset", locales: { "en-US": [{ _id: "{assetId}", type: "image", _source: "uniform-assets" }] } } } }\n');
  }
}

main().catch(console.error);

