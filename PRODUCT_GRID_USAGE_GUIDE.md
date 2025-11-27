# Products Grid Pattern - Usage Guide

## Overview

The **Products Grid Pattern** automatically displays all products from your Uniform Product entries in a responsive grid layout. You don't need to manually add individual product cards - the pattern handles everything automatically using data resources and loops.

## How It Works

The pattern uses a three-part system:

1. **Data Resource**: Queries all Product entries from Uniform CMS
2. **Loop Component**: Automatically iterates over each product entry
3. **Product Cards**: Creates a ProductCard component for each product with data automatically bound

### Data Flow

```
Uniform Products Query Content (Data Resource)
    ↓
Fetches all Product entries (up to limit: 12)
    ↓
$loop Component iterates over entries
    ↓
For each entry, creates a ProductCard with:
    - Name from entry
    - Image from entry
    - Price from entry
    - Description from entry
    - Link to product detail page
```

## Step-by-Step: Using the Pattern

### 1. Add the Pattern to Your Composition

1. Open your composition in Uniform Canvas (e.g., `/products` page)
2. In the component panel, search for **"Products Grid Pattern"**
3. Drag the pattern into your composition's content slot
4. The pattern will automatically appear with a title "Products"

### 2. Verify Products Are Displaying

- The pattern should automatically show up to 12 products (configurable)
- Each product card displays:
  - Product image
  - Product name
  - Product description (first 2 lines)
  - Product price (formatted as currency)
  - Clickable link to product detail page

### 3. Customize the Query (Optional)

To change which products are displayed:

1. Select the **Products Grid Pattern** component in Canvas
2. In the right panel, find the **Data Resources** section
3. Click on **"Uniform Products Query Content"**
4. Adjust the variables:
   - **Limit**: Number of products to show (default: 12)
   - **Filters**: Filter by category, price range, etc.
   - **Order By**: Sort products (name, price, date, etc.)
   - **Search**: Search by keyword

### 4. Override Individual Product Values (Optional)

If you need to customize a specific product card:

1. Expand the **Products Grid Pattern** in Canvas
2. Find the **$loop** component
3. Expand the loop to see individual ProductCard components
4. Select a ProductCard to override its values
5. Change any parameter (name, image, price, description, link)
6. The override only affects that specific product card

## Important Notes

### Price Field Limitation

⚠️ **Note**: The price field currently has a limitation - Uniform doesn't support dynamic tokens for number-type parameters in patterns. The price is set to `0` as a placeholder in the pattern.

**Workarounds:**
1. **Manual Override**: After adding the pattern, manually set prices for each product card
2. **Use Text Field**: Consider changing the price parameter to text type (requires component update)
3. **Future Fix**: This may be resolved in future Uniform updates

### Image Binding

✅ Images are automatically bound from product entries and should display correctly.

### Link Configuration

The pattern creates links to product detail pages using the format:
- `/products/{product-slug}`

Make sure you have a product detail page route configured in your Project Map.

## Troubleshooting

### No Products Showing

**Check:**
1. Do you have Product entries created in Uniform?
   - Go to **Content > Entries** and verify products exist
2. Are products published/enabled?
   - Check that products are in a published state
3. Is the query filter correct?
   - Verify the filter `{"type[eq]":"product"}` matches your content type

### Images Not Displaying

**Check:**
1. Do product entries have images assigned?
   - Edit a product entry and verify the Image field has a value
2. Are images published?
   - Check that images are in a published state

### Price Shows as $0

This is expected due to the number field limitation. You can:
- Manually override prices for each product card
- Or wait for a future fix that supports dynamic tokens for number fields

### Products Not Updating

**Check:**
1. Refresh the page or clear cache
2. Verify the data resource is fetching correctly
3. Check that new products are published

## Example: Creating a Products Page

1. **Create/Edit Composition**: Go to your `/products` composition
2. **Add ProductHero** (optional): Add a hero section with title "Shop All Products"
3. **Add Products Grid Pattern**: Drag the pattern into the content slot
4. **Configure Query** (optional): Set limit to 24, filter by category, etc.
5. **Publish**: Save and publish the composition

The page will automatically display all your products!

## Technical Details

### Pattern Structure

```
Products Grid Pattern (productGrid)
├── Title Parameter: "Products"
└── Products Slot
    └── $loop Component
        ├── Data Resource: "Uniform Products Query Content entries Loop Item"
        └── Body Slot
            └── ProductCard Component
                ├── Name: ${#jptr:/.../entry/fields/name/value}
                ├── Image: ${#jptr:/.../entry/fields/image/value}
                ├── Price: 0 (placeholder - see limitation above)
                ├── Description: ${#jptr:/.../entry/fields/description/value}
                └── Link: /products/${#jptr:/.../entry/_slug}
```

### Data Resource Configuration

**Uniform Products Query Content:**
- Type: `uniformProductsQuery`
- Filters: `{"type[eq]":"product"}`
- Content Types: `product`
- Limit: `12` (configurable)
- Order By: `fields.name_ASC` (configurable)

## Need Help?

If you're still having issues:
1. Check that the pattern is correctly added (not individual ProductCard components)
2. Verify product entries exist and are published
3. Check the browser console for any errors
4. Verify the DataType `uniformProductsQuery` is correctly configured

