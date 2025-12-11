import React from "react";
import NextImage from "next/image";
import { registerUniformComponent } from "@uniformdev/canvas-react";
import type { AssetParamValue, Asset } from "@uniformdev/assets";
import { getTransformedImageUrl, getAssetAltText, getAssetFocalPoint } from "@/utilities/canvas/imageTransform";
import { cn } from "@/lib/utils";

export interface ProductImageGalleryProps {
  className?: string;
  /** Single product image */
  image?: AssetParamValue;
  /** Product name for alt text */
  productName?: string;
}

/**
 * ProductImageGallery - Product image display component
 *
 * Displays the main product image for product detail pages.
 *
 * Features:
 * - Main image display with aspect-square format
 * - Image optimization via Next.js Image
 * - Focal point support from Uniform assets
 * - Responsive design
 * - Fallback placeholder when no image
 *
 * Use Cases:
 * - Product detail pages
 * - Product quick view modals
 *
 * Design Notes:
 * - Main image uses aspect-square (1:1) ratio
 * - Can be bound to Product entry's image field
 */
export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  className = "",
  image,
  productName = "Product",
}) => {
  // Extract image from Uniform asset array (assets always come as arrays)
  const imageAssets = image ?? [];
  const [firstAsset] = imageAssets;
  const asset = firstAsset as Asset | undefined;

  // Get image data
  const focalPoint = getAssetFocalPoint(asset);
  const imageUrl = getTransformedImageUrl(asset, {
    width: 800,
    height: 800,
    fit: "cover",
    focal: focalPoint || "center",
    quality: 90,
  });
  const imageAlt = getAssetAltText(asset, productName);

  // No image placeholder
  if (!imageUrl) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Select a product image in the panel →</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <NextImage
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "productImageGallery",
  component: ProductImageGallery,
});

export default ProductImageGallery;
