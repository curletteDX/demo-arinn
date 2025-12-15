#!/usr/bin/env node
/**
 * Uniform Image-to-Entry Mapping Script
 *
 * This script uses the Uniform Management API to:
 * 1. Upload images from a local folder to Uniform
 * 2. Use AI to intelligently match images to product entries
 * 3. Assign images to the appropriate entry fields
 *
 * Usage:
 *   npm run map-images
 *   or
 *   npx tsx scripts/map-images-to-entries.ts
 *
 * Environment Variables Required:
 *   - UNIFORM_API_KEY: Your Uniform API key
 *   - UNIFORM_PROJECT_ID: Your Uniform project ID
 *   - OPENAI_API_KEY: (Optional) For AI-powered image matching
 *   - IMAGES_DIR: (Optional) Path to images folder (defaults to ./public)
 */

// Load environment variables from .env files
import { config } from 'dotenv';
import { resolve } from 'path';

// Try to load .env.local first (Next.js convention), then .env
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

import * as fs from 'fs';
import * as path from 'path';
import FormData from 'form-data';

interface UniformAsset {
  _id: string;
  url: string;
  fields: {
    title?: { value: string };
    description?: { value: string };
  };
}

interface UniformEntry {
  _id: string;
  _name: string;
  fields: {
    name?: { value: string };
    image?: { type: string; locales?: Record<string, any[]> };
  };
}

interface ImageMatch {
  imagePath: string;
  entryId: string;
  entryName: string;
  confidence: number;
  method: 'filename' | 'ai' | 'manual';
}

class UniformImageMapper {
  private apiKey: string;
  private projectId: string;
  private apiHost: string;
  private imagesDir: string;
  private openaiApiKey?: string;

  constructor() {
    this.apiKey = process.env.UNIFORM_API_KEY || '';
    this.projectId = process.env.UNIFORM_PROJECT_ID || '';
    const apiBase = process.env.UNIFORM_API_BASE || process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app';
    this.apiHost = apiBase.replace('/api', ''); // Remove /api if present for base host
    this.imagesDir = process.env.IMAGES_DIR || path.join(process.cwd(), 'public');
    this.openaiApiKey = process.env.OPENAI_API_KEY;

    if (!this.apiKey) {
      throw new Error('UNIFORM_API_KEY environment variable is required');
    }
    if (!this.projectId) {
      throw new Error('UNIFORM_PROJECT_ID environment variable is required');
    }
  }

  /**
   * Get authorization headers for Uniform API
   */
  private getHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Fetch all product entries from Uniform
   */
  async getProductEntries(): Promise<UniformEntry[]> {
    console.log('📦 Fetching product entries from Uniform...');

    const apiBase = process.env.UNIFORM_API_BASE || `${this.apiHost}/api`;

    // Try different endpoint patterns
    const endpointPatterns = [
      `${apiBase}/v1/projects/${this.projectId}/entries`,
      `${this.apiHost}/api/v1/projects/${this.projectId}/entries`,
      `${apiBase}/projects/${this.projectId}/entries`,
      `${this.apiHost}/api/projects/${this.projectId}/entries`,
    ];

    let data: any = null;
    for (const url of endpointPatterns) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: this.getHeaders(),
        });

        if (response.ok) {
          data = await response.json();
          break;
        }
      } catch (error) {
        // Try next pattern
        continue;
      }
    }

    if (!data) {
      throw new Error('Failed to fetch entries: Could not connect with any endpoint pattern');
    }

    const products = data.results?.filter((entry: any) => entry.contentType === 'product') || [];

    console.log(`✅ Found ${products.length} product entries`);
    return products;
  }

  /**
   * Upload an image file to Uniform and return the asset ID
   */
  async uploadImage(imagePath: string): Promise<string> {
    console.log(`📤 Uploading image: ${path.basename(imagePath)}...`);

    const formData = new FormData();
    const fileStream = fs.createReadStream(imagePath);
    const fileName = path.basename(imagePath);

    formData.append('file', fileStream, fileName);
    formData.append('type', 'image');

    const url = `${this.apiHost}/api/v1/projects/${this.projectId}/assets`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        ...formData.getHeaders(),
      },
      body: formData as unknown as BodyInit,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to upload image: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const assetId = data._id || data.id;

    console.log(`✅ Uploaded: ${fileName} (Asset ID: ${assetId})`);
    return assetId;
  }

  /**
   * Use AI to match image filename to product name
   */
  async matchImageWithAI(imagePath: string, productNames: string[]): Promise<{ name: string; confidence: number } | null> {
    if (!this.openaiApiKey) {
      return null;
    }

    try {
      const fileName = path.basename(imagePath, path.extname(imagePath));
      const prompt = `Given this image filename: "${fileName}", match it to one of these product names:
${productNames.map((n, i) => `${i + 1}. ${n}`).join('\n')}

Return only the product name that best matches, or "none" if no good match exists.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that matches product images to product names based on filename patterns.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 50,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        console.warn('⚠️  OpenAI API error, falling back to filename matching');
        return null;
      }

      const data = await response.json();
      const matchedName = data.choices[0]?.message?.content?.trim().toLowerCase();

      if (!matchedName || matchedName === 'none') {
        return null;
      }

      // Find the best match
      const bestMatch = productNames.find(name =>
        name.toLowerCase().includes(matchedName) || matchedName.includes(name.toLowerCase())
      );

      if (bestMatch) {
        return { name: bestMatch, confidence: 0.8 };
      }

      return null;
    } catch (error) {
      console.warn('⚠️  AI matching failed, using filename matching:', error);
      return null;
    }
  }

  /**
   * Match image filename to product entry using simple string matching
   */
  matchImageByFilename(imagePath: string, entries: UniformEntry[]): ImageMatch | null {
    const fileName = path.basename(imagePath, path.extname(imagePath));
    const fileNameLower = fileName.toLowerCase();

    // Try to find matches based on product name keywords
    for (const entry of entries) {
      const productName = entry.fields.name?.value || entry._name || '';
      const productNameLower = productName.toLowerCase();

      // Extract keywords from product name (e.g., "Aarhus Accent Chair" -> ["aarhus", "accent", "chair"])
      const productKeywords = productNameLower.split(/\s+/);

      // Check if filename contains product keywords
      const matchScore = productKeywords.filter(keyword =>
        fileNameLower.includes(keyword) || keyword.length > 3 && fileNameLower.includes(keyword.substring(0, 3))
      ).length;

      if (matchScore > 0) {
        const confidence = matchScore / productKeywords.length;
        if (confidence > 0.3) { // Minimum 30% match
          return {
            imagePath,
            entryId: entry._id,
            entryName: productName,
            confidence,
            method: 'filename',
          };
        }
      }

      // Also check if product name contains filename keywords
      const fileNameKeywords = fileNameLower.split('-').filter(k => k.length > 2);
      const reverseMatchScore = fileNameKeywords.filter(keyword =>
        productNameLower.includes(keyword)
      ).length;

      if (reverseMatchScore > 0 && fileNameKeywords.length > 0) {
        const confidence = reverseMatchScore / fileNameKeywords.length;
        if (confidence > 0.4) {
          return {
            imagePath,
            entryId: entry._id,
            entryName: productName,
            confidence,
            method: 'filename',
          };
        }
      }
    }

    return null;
  }

  /**
   * Assign an uploaded asset to an entry's image field
   */
  async assignImageToEntry(entryId: string, assetId: string, locale: string = 'en-US'): Promise<void> {
    console.log(`🔗 Assigning asset ${assetId} to entry ${entryId}...`);

    // First, get the current entry to understand its structure
    const getUrl = `${this.apiHost}/api/v1/projects/${this.projectId}/entries/${entryId}`;
    const getResponse = await fetch(getUrl, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!getResponse.ok) {
      throw new Error(`Failed to fetch entry: ${getResponse.statusText}`);
    }

    const entry = await getResponse.json();

    // Update the image field with the asset
    const updateUrl = `${this.apiHost}/api/v1/projects/${this.projectId}/entries/${entryId}`;
    const updatePayload = {
      fields: {
        ...entry.entry.fields,
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
    };

    const updateResponse = await fetch(updateUrl, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(updatePayload),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      throw new Error(`Failed to assign image: ${updateResponse.statusText} - ${errorText}`);
    }

    console.log(`✅ Successfully assigned image to ${entry.entry._name}`);
  }

  /**
   * Get all image files from the images directory
   */
  getImageFiles(): string[] {
    if (!fs.existsSync(this.imagesDir)) {
      throw new Error(`Images directory not found: ${this.imagesDir}`);
    }

    const files = fs.readdirSync(this.imagesDir);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

    return files
      .filter(file => imageExtensions.some(ext => file.toLowerCase().endsWith(ext)))
      .map(file => path.join(this.imagesDir, file));
  }

  /**
   * Main execution function
   */
  async run(): Promise<void> {
    console.log('🚀 Starting image-to-entry mapping process...\n');

    try {
      // Step 1: Get all product entries
      const entries = await this.getProductEntries();
      if (entries.length === 0) {
        console.log('⚠️  No product entries found. Exiting.');
        return;
      }

      // Step 2: Get all image files
      const imageFiles = this.getImageFiles();
      console.log(`📸 Found ${imageFiles.length} image files\n`);

      if (imageFiles.length === 0) {
        console.log('⚠️  No image files found. Exiting.');
        return;
      }

      // Step 3: Match images to entries
      console.log('🔍 Matching images to products...\n');
      const matches: ImageMatch[] = [];

      for (const imagePath of imageFiles) {
        let match: ImageMatch | null = null;

        // Try AI matching first (if available)
        if (this.openaiApiKey) {
          const productNames = entries.map(e => e.fields.name?.value || e._name);
          const aiMatch = await this.matchImageWithAI(imagePath, productNames);

          if (aiMatch) {
            const entry = entries.find(e =>
              (e.fields.name?.value || e._name).toLowerCase() === aiMatch.name.toLowerCase()
            );
            if (entry) {
              match = {
                imagePath,
                entryId: entry._id,
                entryName: aiMatch.name,
                confidence: aiMatch.confidence,
                method: 'ai',
              };
            }
          }
        }

        // Fall back to filename matching
        if (!match) {
          match = this.matchImageByFilename(imagePath, entries);
        }

        if (match) {
          matches.push(match);
          console.log(`✅ Matched: ${path.basename(imagePath)} → ${match.entryName} (${(match.confidence * 100).toFixed(0)}% confidence, ${match.method})`);
        } else {
          console.log(`⚠️  No match found for: ${path.basename(imagePath)}`);
        }
      }

      console.log(`\n📊 Matching Summary: ${matches.length}/${imageFiles.length} images matched\n`);

      // Step 4: Ask for confirmation before proceeding
      if (matches.length === 0) {
        console.log('⚠️  No matches found. Exiting.');
        return;
      }

      // Step 5: Upload images and assign to entries
      console.log('📤 Uploading images and assigning to entries...\n');

      for (const match of matches) {
        try {
          const assetId = await this.uploadImage(match.imagePath);
          await this.assignImageToEntry(match.entryId, assetId);
          console.log('');
        } catch (error) {
          console.error(`❌ Error processing ${path.basename(match.imagePath)}:`, error);
        }
      }

      console.log('✅ Image mapping complete!');
    } catch (error) {
      console.error('❌ Fatal error:', error);
      process.exit(1);
    }
  }
}

// Run the script
if (require.main === module) {
  const mapper = new UniformImageMapper();
  mapper.run().catch(console.error);
}

export default UniformImageMapper;

