import React, { useState } from "react";
import NextImage from "next/image";
import { registerUniformComponent } from "@uniformdev/canvas-react";
import type { AssetParamValue, Asset } from "@uniformdev/assets";
import { getTransformedImageUrl, getAssetAltText, getAssetFocalPoint } from "@/utilities/canvas/imageTransform";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ProductImageGalleryProps {
  className?: string;
  /** Array of product images */
  images?: AssetParamValue;
  /** Product name for alt text */
  productName?: string;
}

/**
 * ProductImageGallery - Interactive product image carousel with thumbnails
 *
 * A full-featured image gallery designed for product detail pages. Displays a main
 * product image with navigation arrows and a thumbnail grid for quick selection.
 *
 * Features:
 * - Main image display with aspect-square format
 * - Previous/Next navigation arrows (visible on hover)
 * - Image counter badge (e.g., "2 / 5")
 * - Thumbnail grid for quick image selection
 * - Active thumbnail indicator
 * - Image optimization via Next.js Image
 * - Focal point support from Uniform assets
 * - Responsive design
 * - Smooth hover transitions
 * - Fallback placeholder when no images
 *
 * Use Cases:
 * - Product detail pages
 * - Product quick view modals
 * - Any multi-image product showcase
 *
 * Design Notes:
 * - Main image uses aspect-square (1:1) ratio
 * - Thumbnails displayed in 4-column grid
 * - Navigation arrows hidden by default, shown on hover
 * - Image counter positioned bottom-right
 * - Active thumbnail has primary ring indicator
 */
export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  className = "",
  images,
  productName = "Product",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Extract images from Uniform asset array
  const imageAssets = images ?? [];
  const hasMultipleImages = imageAssets.length > 1;

  // Get current image data
  const currentAsset = imageAssets[currentIndex] as Asset | undefined;
  const currentFocalPoint = getAssetFocalPoint(currentAsset);

  const currentImageUrl = getTransformedImageUrl(currentAsset, {
    width: 800,
    height: 800,
    fit: "cover",
    focal: currentFocalPoint || "center",
    quality: 90,
  });

  const currentImageAlt = getAssetAltText(currentAsset, `${productName} - Image ${currentIndex + 1}`);

  // Navigation handlers
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageAssets.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === imageAssets.length - 1 ? 0 : prev + 1));
  };

  // No images placeholder
  if (imageAssets.length === 0) {
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
            <p className="text-sm">Select product images in the panel →</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted group">
        {currentImageUrl ? (
          <NextImage
            src={currentImageUrl}
            alt={currentImageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Image not available</p>
          </div>
        )}

        {/* Navigation arrows */}
        {hasMultipleImages && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Image counter */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 right-4 bg-foreground/80 text-background px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {imageAssets.length}
          </div>
        )}
      </div>

      {/* Thumbnail grid */}
      {hasMultipleImages && (
        <div className="grid grid-cols-4 gap-2">
          {imageAssets.map((asset, index) => {
            const thumbAsset = asset as Asset;
            const thumbFocalPoint = getAssetFocalPoint(thumbAsset);
            const thumbUrl = getTransformedImageUrl(thumbAsset, {
              width: 200,
              height: 200,
              fit: "cover",
              focal: thumbFocalPoint || "center",
              quality: 75,
            });
            const thumbAlt = getAssetAltText(thumbAsset, `${productName} - Thumbnail ${index + 1}`);

            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-lg bg-muted transition-all",
                  currentIndex === index
                    ? "ring-2 ring-primary ring-offset-2"
                    : "hover:opacity-75"
                )}
                aria-label={`View image ${index + 1}`}
                aria-current={currentIndex === index ? "true" : undefined}
              >
                {thumbUrl ? (
                  <NextImage
                    src={thumbUrl}
                    alt={thumbAlt}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">No image</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "productImageGallery",
  component: ProductImageGallery,
});

export default ProductImageGallery;
