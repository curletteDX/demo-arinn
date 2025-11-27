import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  UniformText,
  UniformRichText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import type { AssetParamValue } from "@uniformdev/assets";
import { getTransformedImageUrl } from "@/utilities/canvas/imageTransform";
import { cn } from "@/lib/utils";
import { Card as UICard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resolveRichTextRenderer } from "@/lib/richTextRenderers";

/**
 * Link parameter type from Uniform
 */
interface UniformLink {
  type: string;
  path?: string;
  url?: string;
}

export interface ProductCardProps {
  className?: string;
  /** Product name */
  name?: string;
  /** Product price */
  price?: number;
  /** Product image */
  image?: AssetParamValue;
  /** Product description/excerpt */
  description?: string;
  /** Link to product detail page */
  link?: UniformLink;
  /** Product SKU */
  sku?: string;
  /** Product category */
  category?: string;
}

/**
 * ProductCard - Individual product display component
 *
 * A card component designed to display product information in a grid layout.
 * Perfect for product listings, category pages, and featured product sections.
 *
 * Features:
 * - Product image with optimized loading
 * - Product name and price display
 * - Optional description/excerpt
 * - Link to product detail page
 * - Currency formatting for price
 * - Responsive design
 * - Hover effects
 * - All content editable via Uniform
 *
 * Use Cases:
 * - Product grid listings
 * - Featured products
 * - Category pages
 * - Search results
 * - Related products
 *
 * Design Notes:
 * - Uses Next.js Image for optimization
 * - Price formatted as currency (USD)
 * - Card layout with image on top
 * - Full height for grid alignment
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  className = "",
  price,
  image,
  link,
}) => {
  // Extract image
  const imageAssets = image ?? [];
  const [firstAsset] = imageAssets;
  const focalPoint = firstAsset?.fields?.focalPoint?.value;

  const imageUrl = getTransformedImageUrl(firstAsset, {
    width: 400,
    height: 400,
    fit: "cover",
    focal: focalPoint || "center",
    quality: 85,
  });

  const imageAlt = firstAsset?.fields?.description?.value ||
                  firstAsset?.fields?.title?.value ||
                  'Product image';

  // Extract link path
  const href = link?.path || link?.url || "#";

  // Format price as currency
  const formattedPrice = price !== undefined && price !== null
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price)
    : null;

  return (
    <UICard className={cn("h-full overflow-hidden group hover:shadow-xl transition-shadow", className)}>
      <Link href={href} className="block h-full">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {imageUrl ? (
            <NextImage
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Select an image →</p>
            </div>
          )}
        </div>

        {/* Product Info */}
        <CardContent className="p-6">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-lg font-semibold text-foreground mb-2">
              <UniformText
                parameterId="name"
                placeholder="Product Name"
                as="span"
              />
            </CardTitle>
          </CardHeader>

          {/* Description */}
          <div className="text-sm text-muted-foreground mb-4 line-clamp-2 prose prose-sm max-w-none [&>p]:mb-0 [&>p]:line-clamp-2">
            <UniformRichText
              parameterId="description"
              placeholder="Product description"
              resolveRichTextRenderer={resolveRichTextRenderer}
            />
          </div>

          {/* Price */}
          {formattedPrice && (
            <div className="text-xl font-bold text-foreground">
              {formattedPrice}
            </div>
          )}
        </CardContent>
      </Link>
    </UICard>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "productCard",
  component: ProductCard,
});

export default ProductCard;
