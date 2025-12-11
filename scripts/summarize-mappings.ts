#!/usr/bin/env node
/**
 * Summarize Image Mappings
 */

import * as fs from 'fs';
import * as path from 'path';

const mappingFile = path.join(process.cwd(), 'image-mapping.json');

if (!fs.existsSync(mappingFile)) {
  console.error('❌ image-mapping.json not found. Run: npm run map-images-simple');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(mappingFile, 'utf-8'));

// Group by product
const grouped: Record<string, Array<{ filename: string; size: number }>> = {};
const unmatched: Array<{ filename: string }> = [];

data.images.forEach((img: any) => {
  if (img.entryId && img.suggestedProduct) {
    if (!grouped[img.suggestedProduct]) {
      grouped[img.suggestedProduct] = [];
    }
    grouped[img.suggestedProduct].push({
      filename: img.filename,
      size: img.size,
    });
  } else {
    unmatched.push({ filename: img.filename });
  }
});

console.log('📊 IMAGE MAPPING SUMMARY\n');
console.log('═'.repeat(60));
console.log(`Total Images: ${data.images.length}`);
console.log(`Matched: ${data.images.filter((i: any) => i.entryId).length}`);
console.log(`Unmatched: ${unmatched.length}\n`);

console.log('PRODUCTS WITH MATCHED IMAGES:\n');
console.log('─'.repeat(60));

Object.entries(grouped)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([product, images]) => {
    const entryId = data.images.find((i: any) => i.suggestedProduct === product)?.entryId;
    const totalSize = images.reduce((sum, img) => sum + img.size, 0);
    const sizeMB = (totalSize / 1024 / 1024).toFixed(2);

    console.log(`\n✅ ${product}`);
    console.log(`   Entry ID: ${entryId}`);
    console.log(`   Images: ${images.length} (${sizeMB} MB)`);
    console.log(`   Files:`);
    images.forEach(img => {
      console.log(`     • ${img.filename}`);
    });
  });

if (unmatched.length > 0) {
  console.log('\n\n⚠️  UNMATCHED IMAGES:\n');
  console.log('─'.repeat(60));
  unmatched.forEach(img => {
    console.log(`   • ${img.filename}`);
  });
  console.log('\n💡 These images need manual review and assignment.\n');
}

console.log('\n📋 NEXT STEPS:');
console.log('   1. Review the mappings above');
console.log('   2. For each product, upload images via Uniform UI:');
console.log('      - Go to the entry edit page');
console.log('      - Click the image field');
console.log('      - Upload the matching images');
console.log('   3. Or use the mapping file to create an upload script\n');

