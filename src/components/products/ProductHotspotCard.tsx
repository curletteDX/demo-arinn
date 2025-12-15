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
import { Button } from "@/components/ui/button";
import { resolveRichTextRenderer } from "@/lib/richTextRenderers";

/**
 * Link parameter type from Uniform
 */
interface UniformLink {
  type: string;
  path?: string;
  url?: string;
}

export interface ProductHotspotCardProps {
  className?: string;
  /** Product image */
  image?: AssetParamValue;
  /** Product name */
  name?: string;
  /** Product price */
  price?: number;
  /** Original price (for showing discounts) */
  originalPrice?: number;
  /** Product description/excerpt */
  description?: string;
  /** Link to product detail page */
  productLink?: UniformLink;
  /** Text for the "View Details" button */
  viewDetailsText?: string;
  /** Text for the "Add to Bag" button */
  addToBagText?: string;
}

/**
 * ProductHotspotCard - Product card designed for hotspot tooltips
 *
 * A compact product card optimized for display within image hotspot tooltips.
 * Shows product information with image on left and details on right.
 *
 * Features:
 * - Product image on the left side
 * - Product name, price, and description on the right
 * - Original/discounted price display
 * - "View Product Detail" link
 * - "Add to Bag" call-to-action button
 * - Compact layout suitable for tooltips
 * - All content editable via Uniform
 *
 * Use Cases:
 * - Image hotspot tooltips
 * - Product quick view overlays
 * - Interactive lifestyle images
 * - Shoppable gallery items
 *
 * Design Notes:
 * - Horizontal layout optimized for tooltips
 * - Clean white background with shadow
 * - Currency formatting for prices
 * - Responsive on mobile (stacks vertically)
 */
export const ProductHotspotCard: React.FC<ProductHotspotCardProps> = ({
  className = "",
  image,
  price,
  originalPrice,
  productLink,
}) => {
  // Extract image
  const imageAssets = image ?? [];
  const [firstAsset] = imageAssets;
  const focalPoint = firstAsset?.fields?.focalPoint?.value;

  const imageUrl = getTransformedImageUrl(firstAsset, {
    width: 200,
    height: 200,
    fit: "cover",
    focal: focalPoint || "center",
    quality: 85,
  });

  const imageAlt =
    firstAsset?.fields?.description?.value ||
    firstAsset?.fields?.title?.value ||
    "Product image";

  // Extract link path
  const href = productLink?.path || productLink?.url || "#";

  // Format prices as currency
  const formattedPrice =
    price !== undefined && price !== null
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(price)
      : null;

  const formattedOriginalPrice =
    originalPrice !== undefined && originalPrice !== null
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(originalPrice)
      : null;

  return (
    <div
      className={cn(
        "bg-background rounded-lg shadow-xl overflow-hidden w-full max-w-lg",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Product Image - Left Side */}
        <div className="w-full sm:w-1/3 shrink-0">
          <div className="relative aspect-square bg-muted">
            {imageUrl ? (
              <NextImage
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="200px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground text-xs">
                  Select an image →
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Product Info - Right Side */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-2">
            {/* Product Name */}
            <h3 className="text-lg font-bold text-foreground leading-tight">
              <UniformText
                parameterId="name"
                placeholder="Product Name"
                as="span"
              />
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              {formattedPrice && (
                <span className="text-xl font-bold text-foreground">
                  {formattedPrice}
                </span>
              )}
              {formattedOriginalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="text-xs text-muted-foreground line-clamp-2 prose prose-sm max-w-none [&>p]:mb-0">
              <UniformRichText
                parameterId="description"
                placeholder="Add a brief product description..."
                resolveRichTextRenderer={resolveRichTextRenderer}
              />
            </div>

            {/* View Product Link */}
            {href !== "#" && (
              <Link
                href={href}
                className="text-xs text-foreground hover:underline inline-block"
              >
                <span>
                  <UniformText
                    parameterId="viewDetailsText"
                    placeholder="View Product Detail"
                    as="span"
                  />
                </span>
              </Link>
            )}
          </div>

          {/* Add to Bag Button */}
          <div className="mt-3">
            <Button className="w-full bg-foreground text-background hover:bg-foreground/90" size="sm">
              <span>
                <UniformText
                  parameterId="addToBagText"
                  placeholder="Add to Bag"
                  as="span"
                />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "productHotspotCard",
  component: ProductHotspotCard,
});

export default ProductHotspotCard;

