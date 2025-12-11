#!/usr/bin/env node
/**
 * Simple Image-to-Entry Mapping Script (Using MCP Tools)
 *
 * This script:
 * 1. Lists all product entries from Uniform (via MCP)
 * 2. Lists all images in the public folder
 * 3. Provides a mapping interface to match images to products
 * 4. Generates instructions for manual upload or API calls
 *
 * Usage:
 *   npm run map-images-simple
 */

import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

interface ProductEntry {
  id: string;
  name: string;
  hasImage: boolean;
  imageUrl?: string;
}

interface ImageFile {
  path: string;
  name: string;
  size: number;
}

async function main() {
  console.log('🖼️  Image-to-Entry Mapping Helper\n');

  // Step 1: Get product entries using MCP (we'll simulate this)
  console.log('📦 Fetching product entries...');
  console.log('   (This would use MCP tools to get entries)');
  console.log('   💡 For now, please provide entry IDs manually\n');

  // Step 2: List images
  const imagesDir = process.env.IMAGES_DIR || path.join(process.cwd(), 'public');
  console.log(`📸 Scanning images in: ${imagesDir}`);

  if (!fs.existsSync(imagesDir)) {
    console.error(`❌ Images directory not found: ${imagesDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const images: ImageFile[] = files
    .filter(file => imageExtensions.some(ext => file.toLowerCase().endsWith(ext)))
    .map(file => {
      const fullPath = path.join(imagesDir, file);
      const stats = fs.statSync(fullPath);
      return {
        path: fullPath,
        name: file,
        size: stats.size,
      };
    });

  console.log(`✅ Found ${images.length} images\n`);

  // Step 3: Generate mapping suggestions
  console.log('💡 Image Mapping Suggestions:\n');
  console.log('To map images to entries, you have two options:\n');

  console.log('Option 1: Use Uniform UI (Recommended)');
  console.log('   1. Go to each product entry in Uniform');
  console.log('   2. Click the image field');
  console.log('   3. Upload or select the matching image\n');

  console.log('Option 2: Use this mapping file');
  console.log('   I can generate a JSON file with suggested mappings\n');

  // Generate a mapping file
  const mappingFile = path.join(process.cwd(), 'image-mapping.json');
  const mapping = {
    images: images.map(img => ({
      filename: img.name,
      path: img.path,
      size: img.size,
      suggestedProduct: null as string | null,
      entryId: null as string | null,
    })),
    instructions: [
      '1. Review the suggested mappings below',
      '2. Update entryId for each image',
      '3. Run the upload script (coming soon)',
    ],
  };

  // Get actual product entries (you would use MCP tools here)
  // For now, we'll use a mapping of product names to entry IDs
  // In a real implementation, you'd fetch these via MCP tools
  const productEntries: Record<string, string> = {
    'Aarhus Accent Chair': 'b7bfc2b0-8d40-4ccf-b3c2-e9154260753d',
    'Tampere Loveseat': '63c9b2b7-f942-420e-a2e3-f5ddc6bb14cb',
    'Reykjavik Bookshelf': '5ba66df1-ee00-4c4c-a57b-73a56bbecf13',
    'Trondheim Dining Table': 'e1c62ac3-6f78-41d2-a562-ae1fa76e8c3a',
    'Uppsala Nightstand': 'f60716f8-405a-48ea-a975-d6f6ec1e48fe',
    'Gothenburg Three-Seater': 'd15808f9-7d2a-4b99-99f4-c765b5750631',
    'Malmo Sideboard': 'c3a45fd9-107a-4bda-b6bd-48dc579b267f',
    'Helsinki Dining Chair': 'f385d0e3-4320-4fc4-bad2-de6bc2b597a2',
    'Stockholm Platform Bed': '7f3848dc-56c5-4735-bddc-9ac6e7424af8',
    'Copenhagen Coffee Table': '862bbc71-e06d-49de-9516-39ade27376a1',
    'Bergen Lounge Chair': '57529878-87f5-495f-97fb-8210d7e1c5f7',
    'Oslo Sectional Sofa': '1c59b8ed-a75d-4a98-81e1-d564b5da16c2',
    'Walnut Dining Table': '536cab9e-bacb-4c2f-a6f0-28994be75e2a',
    'Modern Sectional Sofa': '0506fbab-081f-47f6-abf2-fdb8eec09240',
  };

  const productNames = Object.keys(productEntries);

  mapping.images.forEach(img => {
    const fileNameLower = img.filename.toLowerCase();
    for (const productName of productNames) {
      const productKeywords = productName.toLowerCase().split(/\s+/);
      const matchScore = productKeywords.filter(keyword =>
        fileNameLower.includes(keyword) || (keyword.length > 3 && fileNameLower.includes(keyword.substring(0, 3)))
      ).length;

      if (matchScore > 0 && matchScore / productKeywords.length > 0.3) {
        img.suggestedProduct = productName;
        img.entryId = productEntries[productName]; // Auto-populate entry ID
        break;
      }
    }
  });

  fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2));
  console.log(`✅ Generated mapping file: ${mappingFile}`);
  console.log(`   ${mapping.images.filter(i => i.suggestedProduct).length} images have suggested matches\n`);

  console.log('📋 Summary:');
  console.log(`   Total images: ${images.length}`);
  console.log(`   With suggestions: ${mapping.images.filter(i => i.suggestedProduct).length}`);
  console.log(`   Without suggestions: ${mapping.images.filter(i => !i.suggestedProduct).length}\n`);

  console.log('Next steps:');
  console.log('   1. Review image-mapping.json');
  console.log('   2. Add entryId for each image you want to map');
  console.log('   3. We can then create an upload script\n');
}

main().catch(console.error);

