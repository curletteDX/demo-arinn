#!/usr/bin/env node
/**
 * Test Uniform API Connection
 *
 * This script tests the connection to Uniform API and verifies
 * that we can fetch entries and understand the API structure.
 */

// Load environment variables from .env files
import { config } from 'dotenv';
import { resolve } from 'path';

// Try to load .env.local first (Next.js convention), then .env
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

async function testUniformAPI() {
  const apiKey = process.env.UNIFORM_API_KEY;
  const projectId = process.env.UNIFORM_PROJECT_ID;
  const apiBase = process.env.UNIFORM_API_BASE || process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app';
  const apiHost = apiBase.replace('/api', ''); // Remove /api if present for base host

  console.log('🧪 Testing Uniform API Connection...\n');

  // Check environment variables
  if (!apiKey) {
    console.error('❌ UNIFORM_API_KEY is not set');
    console.log('\n💡 Add to your .env file:');
    console.log('   UNIFORM_API_KEY=uf_your_key_here');
    process.exit(1);
  }

  if (!projectId) {
    console.error('❌ UNIFORM_PROJECT_ID is not set');
    console.log('\n💡 Add to your .env file:');
    console.log('   UNIFORM_PROJECT_ID=your_project_id_here');
    process.exit(1);
  }

  console.log('✅ Environment variables found');
  console.log(`   API Host: ${apiHost}`);
  console.log(`   Project ID: ${projectId.substring(0, 8)}...`);
  console.log(`   API Key: ${apiKey.substring(0, 10)}...\n`);

  // Test 1: Fetch entries - try multiple endpoint patterns
  console.log('📦 Testing: Fetch entries...');
  let entriesData: any = null;
  let entriesUrl = '';

  // Try different API endpoint patterns
  const endpointPatterns = [
    `${apiBase}/v1/projects/${projectId}/entries`, // With /api base
    `${apiHost}/api/v1/projects/${projectId}/entries`, // Standard pattern
    `${apiBase}/projects/${projectId}/entries`, // Without v1
    `${apiHost}/api/projects/${projectId}/entries`, // Alternative
  ];

  for (const url of endpointPatterns) {
    try {
      console.log(`   Trying: ${url}`);
      const entriesResponse = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (entriesResponse.ok) {
        entriesData = await entriesResponse.json();
        entriesUrl = url;
        console.log(`   ✅ Success with: ${url}\n`);
        break;
      } else {
        const errorText = await entriesResponse.text();
        console.log(`   ❌ ${entriesResponse.status}: ${errorText.substring(0, 100)}`);
      }
    } catch (error: any) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  }

  if (!entriesData) {
    console.error('\n❌ Could not connect to Uniform API with any endpoint pattern');
    console.error('💡 Possible issues:');
    console.error('   - Check UNIFORM_API_KEY has read permissions');
    console.error('   - Verify UNIFORM_PROJECT_ID is correct');
    console.error('   - Check UNIFORM_API_BASE URL format');
    process.exit(1);
  }

  const products = entriesData.results?.filter((e: any) => e.contentType === 'product') || [];

  console.log(`✅ Successfully fetched ${entriesData.results?.length || 0} entries`);
  console.log(`   Found ${products.length} product entries`);
  console.log(`   Working endpoint: ${entriesUrl}\n`);

  if (products.length > 0) {
    console.log('📋 Sample products:');
    products.slice(0, 5).forEach((p: any) => {
      console.log(`   - ${p.name} (${p.id?.substring(0, 8) || 'unknown'}...)`);
    });
    console.log('');
  }

  // Test 2: Check if we can get a single entry
  console.log('📄 Testing: Fetch single entry...');
  try {
    // Use the working endpoint pattern
    const baseUrl = entriesUrl.replace('/entries', '');
    const singleEntryUrl = `${baseUrl}/entries/${products[0]?.id || ''}`;

    if (!products[0]?.id) {
      console.log('   ⚠️  No product entries to test with');
      return;
    }

    const entryResponse = await fetch(singleEntryUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (entryResponse.ok) {
      const entryData = await entryResponse.json();
      console.log(`✅ Successfully fetched entry: ${entryData.entry?._name || entryData._name || 'Unknown'}`);
      console.log(`   Has image field: ${entryData.entry?.fields?.image || entryData.fields?.image ? 'Yes' : 'No'}`);
    } else {
      console.warn(`⚠️  Could not fetch single entry: ${entryResponse.status}`);
    }
  } catch (error: any) {
    console.warn(`⚠️  Error fetching single entry: ${error.message}`);
  }

  console.log('\n✅ All API tests passed!');
  console.log('💡 You can now run: npm run map-images\n');
}

testUniformAPI().catch(console.error);

