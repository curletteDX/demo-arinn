import React from "react";
import NextImage from "next/image";
import {
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import type { AssetParamValue } from "@uniformdev/assets";
import { getTransformedImageUrl } from "@/utilities/canvas/imageTransform";
import { cn } from "@/lib/utils";

export interface LifestyleGalleryItemProps {
  className?: string;
  /** Image asset */
  image?: AssetParamValue;
  /** Grid span class (e.g., "col-span-1 row-span-2") */
  gridSpan?: string;
}

/**
 * LifestyleGalleryItem - Individual image in the lifestyle gallery
 *
 * A gallery item component that displays a lifestyle image with hover effects.
 * Supports flexible grid positioning via the gridSpan parameter.
 *
 * Features:
 * - Full-bleed image with rounded corners
 * - Hover scale effect
 * - Overlay on hover
 * - Configurable grid span for masonry layout
 * - Responsive image optimization
 *
 * Design Notes:
 * - Uses aspect ratio preservation
 * - Smooth hover transitions
 * - Dark overlay on hover for visual feedback
 */
export const LifestyleGalleryItem: React.FC<LifestyleGalleryItemProps> = ({
  className = "",
  image,
  gridSpan = "col-span-1 row-span-1",
}) => {
  // Extract image
  const imageAssets = image ?? [];
  const [firstAsset] = imageAssets;
  const focalPoint = firstAsset?.fields?.focalPoint?.value;

  const imageUrl = getTransformedImageUrl(firstAsset, {
    width: 800,
    height: 800,
    fit: "cover",
    focal: focalPoint || "center",
    quality: 85,
  });

  const imageAlt = firstAsset?.fields?.description?.value ||
                  firstAsset?.fields?.title?.value ||
                  'Lifestyle image';

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl group cursor-pointer w-full h-full",
        gridSpan,
        className
      )}
      style={{ minHeight: '200px' }}
    >
      {imageUrl ? (
        <>
          <NextImage
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
        </>
      ) : (
        <div className="absolute inset-0 bg-secondary flex items-center justify-center">
          <p className="text-muted-foreground">Select an image →</p>
        </div>
      )}
    </div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "lifestyleGalleryItem",
  component: LifestyleGalleryItem,
});

export default LifestyleGalleryItem;

