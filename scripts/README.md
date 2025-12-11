# Uniform Image-to-Entry Mapping Script

This script automates the process of uploading images to Uniform and assigning them to product entries using AI-powered matching.

## Features

- 📤 **Automatic Image Upload**: Uploads images from a local folder to Uniform's asset library
- 🤖 **AI-Powered Matching**: Uses OpenAI (optional) to intelligently match images to products
- 🔍 **Smart Filename Matching**: Falls back to intelligent filename-to-product matching
- ✅ **Automatic Assignment**: Assigns uploaded images to the correct entry fields

## Prerequisites

1. **Node.js 18+** and npm installed
2. **Uniform API Key** with write permissions
3. **OpenAI API Key** (optional, for AI matching)

## Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `form-data` - For multipart file uploads
- `tsx` - For running TypeScript files directly
- `@types/form-data` - TypeScript types

### 2. Configure Environment Variables

Create or update your `.env` file with:

```env
# Required
UNIFORM_API_KEY=uf_your_api_key_here
UNIFORM_PROJECT_ID=your_project_id_here

# Optional - for AI-powered matching
OPENAI_API_KEY=sk-your-openai-key-here

# Optional - custom images directory (defaults to ./public)
IMAGES_DIR=./public
```

### 3. Prepare Your Images

Place your product images in the `public` folder (or your custom `IMAGES_DIR`).

**Best Practices:**
- Use descriptive filenames that include product keywords
- Examples:
  - `aarhus-accent-chair-mustard.jpg` → matches "Aarhus Accent Chair"
  - `tampere-loveseat-blue.jpg` → matches "Tampere Loveseat"
  - `mid-century-modern-bookshelf.jpg` → matches "Reykjavik Bookshelf"

## Usage

### Basic Usage (Filename Matching Only)

```bash
npm run map-images
```

This will:
1. Scan the `public` folder for images
2. Fetch all product entries from Uniform
3. Match images to products using filename analysis
4. Upload matched images to Uniform
5. Assign images to the corresponding product entries

### With AI-Powered Matching

If you have an `OPENAI_API_KEY` set, the script will:
1. First try AI matching (more accurate)
2. Fall back to filename matching if AI fails

## How Matching Works

### 1. AI Matching (if OpenAI key is provided)

The script uses GPT-4o-mini to analyze image filenames and match them to product names. This is more accurate for complex filenames.

### 2. Filename Matching (fallback)

The script extracts keywords from:
- **Product names**: "Aarhus Accent Chair" → ["aarhus", "accent", "chair"]
- **Image filenames**: "boucle-accent-chair-mustard.jpg" → ["boucle", "accent", "chair", "mustard"]

It then calculates a match score based on overlapping keywords.

### 3. Confidence Scoring

Matches are scored from 0-1:
- **> 0.7**: High confidence (AI match)
- **0.4 - 0.7**: Medium confidence (good filename match)
- **< 0.4**: Low confidence (skipped)

## Example Output

```
🚀 Starting image-to-entry mapping process...

📦 Fetching product entries from Uniform...
✅ Found 15 product entries
📸 Found 79 image files

🔍 Matching images to products...

✅ Matched: boucle-accent-chair-mustard-yellow.jpg → Aarhus Accent Chair (85% confidence, ai)
✅ Matched: tampere-loveseat-blue.jpg → Tampere Loveseat (72% confidence, filename)
✅ Matched: mid-century-modern-bookshelf.jpg → Reykjavik Bookshelf (65% confidence, filename)
⚠️  No match found for: decorative-rug-and-pillows.jpg

📊 Matching Summary: 12/79 images matched

📤 Uploading images and assigning to entries...

📤 Uploading image: boucle-accent-chair-mustard-yellow.jpg...
✅ Uploaded: boucle-accent-chair-mustard-yellow.jpg (Asset ID: abc123...)
🔗 Assigning asset abc123... to entry xyz789...
✅ Successfully assigned image to Aarhus Accent Chair

✅ Image mapping complete!
```

## Troubleshooting

### "No matches found"

**Possible causes:**
- Image filenames don't contain product keywords
- Product names are too different from filenames

**Solutions:**
- Rename images to include product keywords
- Use AI matching (set `OPENAI_API_KEY`)
- Manually match images in Uniform UI

### "Failed to upload image"

**Possible causes:**
- Invalid API key
- Network issues
- File too large

**Solutions:**
- Verify `UNIFORM_API_KEY` is correct
- Check network connection
- Ensure images are < 10MB

### "Failed to assign image"

**Possible causes:**
- Entry doesn't exist
- API permissions insufficient
- Entry structure changed

**Solutions:**
- Verify entries exist in Uniform
- Check API key has write permissions
- Run `npm run uniform:pull` to sync latest structure

## Manual Override

If automatic matching fails, you can:

1. **Manually upload in Uniform UI:**
   - Go to the entry edit page
   - Click the image field
   - Upload or select an asset

2. **Use the script for uploads only:**
   - Modify the script to skip matching
   - Upload all images
   - Manually assign in UI

## API Rate Limits

Be aware of Uniform API rate limits:
- Asset uploads: ~10-20 per minute
- Entry updates: ~30-60 per minute

The script processes images sequentially to avoid rate limits.

## Next Steps

After running the script:

1. **Verify in Uniform:**
   - Check entries have images assigned
   - Verify image quality and sizing

2. **Pull latest data:**
   ```bash
   npm run uniform:pull
   ```

3. **Test in your app:**
   - View product pages
   - Verify images display correctly

## Advanced Usage

### Custom Image Directory

```bash
IMAGES_DIR=./product-images npm run map-images
```

### Dry Run Mode

Modify the script to add a `--dry-run` flag that:
- Shows matches without uploading
- Useful for testing matching logic

## Support

For issues or questions:
- Check Uniform API documentation
- Review script logs for detailed error messages
- Verify environment variables are set correctly

