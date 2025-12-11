import React, { useState } from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ProductImageGalleryStaticProps {
  className?: string;
  /** Array of product image URLs */
  images: string[];
  /** Product name for alt text */
  productName?: string;
}

/**
 * ProductImageGalleryStatic - Static product image carousel with thumbnails
 *
 * A standalone version of the ProductImageGallery that works with plain
 * image URLs instead of Uniform assets. Perfect for static product pages.
 *
 * Features:
 * - Main image display with rounded corners
 * - Previous/Next navigation arrows (visible on hover)
 * - Image counter badge (e.g., "2 / 5")
 * - Thumbnail grid for quick image selection
 * - Active thumbnail indicator with ring
 * - Smooth hover transitions
 */
export const ProductImageGalleryStatic: React.FC<ProductImageGalleryStaticProps> = ({
  className = "",
  images,
  productName = "Product",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentIndex];

  // Navigation handlers
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // No images placeholder
  if (images.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F0EDE8] flex items-center justify-center">
          <div className="text-center text-gray-400">
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
            <p className="text-sm">No product images available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F0EDE8] group">
        {currentImage ? (
          <NextImage
            src={currentImage}
            alt={`${productName} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-400 text-sm">Image not available</p>
          </div>
        )}

        {/* Navigation arrows */}
        {hasMultipleImages && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white shadow-md"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white shadow-md"
              onClick={goToNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </Button>
          </>
        )}

        {/* Image counter */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 right-4 bg-gray-900/80 text-white px-3 py-1.5 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail grid */}
      {hasMultipleImages && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl bg-[#F0EDE8] transition-all",
                currentIndex === index
                  ? "ring-2 ring-[#8B7355] ring-offset-2"
                  : "hover:opacity-75"
              )}
              aria-label={`View image ${index + 1}`}
              aria-current={currentIndex === index ? "true" : undefined}
            >
              <NextImage
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGalleryStatic;
