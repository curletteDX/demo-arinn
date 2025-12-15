#!/usr/bin/env node
/**
 * Update Uniform Entries with Existing Assets
 *
 * This script:
 * 1. Reads image-mapping.json
 * 2. Finds assets in Uniform by filename
 * 3. Updates each entry's image field with the matching asset
 *
 * Usage:
 *   npm run update-entries-assets
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

class UniformEntryUpdater {
  private apiKey: string;
  private projectId: string;
  private apiBase: string;
  private apiHost: string;

  constructor() {
    this.apiKey = process.env.UNIFORM_API_KEY || '';
    this.projectId = process.env.UNIFORM_PROJECT_ID || '';
    const apiBaseEnv = process.env.UNIFORM_API_BASE || process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app';
    this.apiBase = apiBaseEnv.includes('/api') ? apiBaseEnv : `${apiBaseEnv}/api`;
    this.apiHost = apiBaseEnv.replace('/api', '');

    if (!this.apiKey) {
      throw new Error('UNIFORM_API_KEY is required');
    }
    if (!this.projectId) {
      throw new Error('UNIFORM_PROJECT_ID is required');
    }
  }

  private getHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Find an asset in Uniform by filename
   * First checks local uniform-data/asset files, then tries API
   */
  async findAssetByFilename(filename: string): Promise<AssetInfo | null> {
    // First, try to find in local uniform-data/asset files
    const assetDir = path.join(process.cwd(), 'uniform-data', 'asset');
    if (fs.existsSync(assetDir)) {
      const assetFiles = fs.readdirSync(assetDir).filter(f => f.endsWith('.yaml'));

      for (const assetFile of assetFiles) {
        try {
          const assetPath = path.join(assetDir, assetFile);
          const assetContent = fs.readFileSync(assetPath, 'utf-8');

          // Parse YAML properly
          const assetData = yaml.load(assetContent) as any;
          const asset = assetData?.asset;

          if (!asset) continue;

          const assetId = asset._id || path.basename(assetFile, '.yaml');
          const assetTitle = asset.fields?.title?.value || '';
          const assetUrl = asset.fields?.url?.value || '';

          if (assetTitle) {
            // Normalize for comparison
            const filenameBase = filename.toLowerCase().replace(/\.[^/.]+$/, '');
            const assetTitleLower = assetTitle.toLowerCase().replace(/\.[^/.]+$/, '');

            // Try exact match (normalized)
            if (filenameBase === assetTitleLower ||
                filenameBase.replace(/-/g, '') === assetTitleLower.replace(/-/g, '')) {
              return {
                id: assetId,
                filename: assetTitle,
                url: assetUrl,
              };
            }

            // Try partial match - check if key parts match
            const filenameParts = filenameBase.split('-').filter((p: string) => p.length > 2);
            const assetParts = assetTitleLower.split('-').filter((p: string) => p.length > 2);

            // Count matching parts
            const matchingParts = filenameParts.filter((fp: string) =>
              assetParts.some((ap: string) => ap.includes(fp) || fp.includes(ap))
            ).length;

            // If at least 50% of parts match
            if (matchingParts > 0 && matchingParts / Math.max(filenameParts.length, assetParts.length) >= 0.5) {
              return {
                id: assetId,
                filename: assetTitle,
                url: assetUrl,
              };
            }
          }
        } catch (error) {
          // Skip this file and continue
          continue;
        }
      }
    }

    // Fallback: Try API endpoints
    const endpointPatterns = [
      `${this.apiBase}/v1/projects/${this.projectId}/assets`,
      `${this.apiHost}/api/v1/projects/${this.projectId}/assets`,
      `${this.apiBase}/projects/${this.projectId}/assets`,
      `${this.apiHost}/api/projects/${this.projectId}/assets`,
    ];

    for (const url of endpointPatterns) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: this.getHeaders(),
        });

        if (response.ok) {
          const data = await response.json();
          const assets = data.results || data.assets || data.data || [];

          // Search for asset by filename
          const matchingAsset = assets.find((asset: any) => {
            const assetFilename = asset.filename ||
                                 asset.name ||
                                 asset.fields?.title?.value ||
                                 asset.title ||
                                 '';
            return assetFilename.toLowerCase().includes(filename.toLowerCase().replace(/\.[^/.]+$/, '')) ||
                   filename.toLowerCase().includes(assetFilename.toLowerCase());
          });

          if (matchingAsset) {
            return {
              id: matchingAsset._id || matchingAsset.id || matchingAsset.assetId,
              filename: matchingAsset.filename || matchingAsset.name || filename,
              url: matchingAsset.url || matchingAsset.fields?.url?.value,
            };
          }
        }
      } catch (error) {
        // Try next endpoint
        continue;
      }
    }

    return null;
  }

  /**
   * Get entry by ID - try multiple approaches
   */
  async getEntry(entryId: string): Promise<any> {
    const endpointPatterns = [
      `${this.apiBase}/v1/projects/${this.projectId}/entries/${entryId}`,
      `${this.apiHost}/api/v1/projects/${this.projectId}/entries/${entryId}`,
      `${this.apiBase}/projects/${this.projectId}/entries/${entryId}`,
      `${this.apiHost}/api/projects/${this.projectId}/entries/${entryId}`,
    ];

    for (const url of endpointPatterns) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: this.getHeaders(),
        });

        if (response.ok) {
          const data = await response.json();
          return data.entry || data;
        } else {
          const errorText = await response.text();
          console.log(`   ⚠️  GET ${response.status}: ${errorText.substring(0, 100)}`);
        }
      } catch (error: any) {
        console.log(`   ⚠️  GET Error: ${error.message}`);
        continue;
      }
    }

    // If REST API doesn't work, try to construct entry structure from known format
    // This is a fallback - we'll use the standard entry structure
    console.log(`   ⚠️  Could not fetch entry via API, using standard structure`);
    return {
      fields: {
        image: {
          type: 'asset',
          locales: {},
        },
      },
    };
  }

  /**
   * Update entry with asset
   */
  async updateEntryWithAsset(entryId: string, assetId: string, locale: string = 'en-US'): Promise<void> {
    // Try to get the current entry, but don't fail if we can't
    let entry: any = null;
    try {
      entry = await this.getEntry(entryId);
    } catch (error) {
      // Continue with minimal structure
      entry = { fields: {} };
    }

    // Prepare update payload - try different formats
    const updatePayloads = [
      // Format 1: Full entry structure
      {
        fields: {
          ...(entry.fields || {}),
          image: {
            type: 'asset',
            locales: {
              [locale]: [
                {
                  _id: assetId,
                  type: 'image',
                  _source: 'uniform-assets',
                },
              ],
            },
          },
        },
      },
      // Format 2: Minimal structure
      {
        image: {
          type: 'asset',
          locales: {
            [locale]: [
              {
                _id: assetId,
                type: 'image',
                _source: 'uniform-assets',
              },
            ],
          },
        },
      },
      // Format 3: Direct field update
      {
        fields: {
          image: {
            type: 'asset',
            locales: {
              [locale]: [
                {
                  _id: assetId,
                  type: 'image',
                  _source: 'uniform-assets',
                },
              ],
            },
          },
        },
      },
    ];

    // Try different update endpoint patterns and payload formats
    const endpointPatterns = [
      `${this.apiBase}/v1/projects/${this.projectId}/entries/${entryId}`,
      `${this.apiHost}/api/v1/projects/${this.projectId}/entries/${entryId}`,
      `${this.apiBase}/projects/${this.projectId}/entries/${entryId}`,
      `${this.apiHost}/api/projects/${this.projectId}/entries/${entryId}`,
    ];

    let success = false;
    let lastError = '';

    for (const updatePayload of updatePayloads) {
      for (const url of endpointPatterns) {
        try {
          const response = await fetch(url, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(updatePayload),
          });

          if (response.ok) {
            success = true;
            break;
          } else {
            const errorText = await response.text();
            lastError = `${response.status}: ${errorText.substring(0, 200)}`;
            // Don't log every attempt, only if all fail
          }
        } catch (error: any) {
          lastError = error.message;
          continue;
        }
      }
      if (success) break;
    }

    if (!success) {
      throw new Error(`Failed to update entry ${entryId} with asset ${assetId}. Last error: ${lastError}`);
    }
  }

  /**
   * Process mappings and update entries
   */
  async processMappings(mappingFile: string): Promise<void> {
    console.log('🚀 Starting entry update process...\n');

    if (!fs.existsSync(mappingFile)) {
      throw new Error(`Mapping file not found: ${mappingFile}`);
    }

    const data: MappingData = JSON.parse(fs.readFileSync(mappingFile, 'utf-8'));
    const mappings = data.images.filter(img => img.entryId);

    console.log(`📋 Found ${mappings.length} entries to update\n`);

    // Group by entry to handle multiple images per entry
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

    let successCount = 0;
    let errorCount = 0;
    const errors: Array<{ entry: string; filename: string; error: string }> = [];

    for (const [entryId, images] of Object.entries(entryGroups)) {
      const productName = images[0].suggestedProduct || 'Unknown';
      console.log(`\n📝 ${productName} (${entryId.substring(0, 8)}...)`);
      console.log(`   Images to process: ${images.length}`);

      // Use the first image (or you could handle multiple)
      const image = images[0];

      try {
        // Find asset
        console.log(`   🔍 Finding asset: ${image.filename}...`);
        const asset = await this.findAssetByFilename(image.filename);

        if (!asset) {
          throw new Error(`Asset not found for: ${image.filename}`);
        }

        console.log(`   ✅ Found asset: ${asset.id.substring(0, 8)}...`);

        // Update entry
        console.log(`   🔄 Updating entry...`);
        await this.updateEntryWithAsset(entryId, asset.id);

        console.log(`   ✅ Successfully updated!`);
        successCount++;
      } catch (error: any) {
        console.error(`   ❌ Error: ${error.message}`);
        errorCount++;
        errors.push({
          entry: productName,
          filename: image.filename,
          error: error.message,
        });
      }
    }

    console.log('\n' + '═'.repeat(60));
    console.log('📊 SUMMARY');
    console.log('═'.repeat(60));
    console.log(`✅ Successfully updated: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);

    if (errors.length > 0) {
      console.log('\n⚠️  ERRORS:');
      errors.forEach(err => {
        console.log(`   • ${err.entry} - ${err.filename}`);
        console.log(`     ${err.error}`);
      });
    }

    console.log('\n💡 Next steps:');
    console.log('   1. Verify updates in Uniform UI');
    console.log('   2. Run: npm run uniform:pull to sync changes\n');
  }
}

// Main execution
async function main() {
  try {
    const mappingFile = path.join(process.cwd(), 'image-mapping.json');
    const updater = new UniformEntryUpdater();
    await updater.processMappings(mappingFile);
  } catch (error: any) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);

