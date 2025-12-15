import React from "react";
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import type { AssetParamValue } from "@uniformdev/assets";
import NextImage from "next/image";
import { getTransformedImageUrl } from "@/utilities/canvas/imageTransform";
import { cn } from "@/lib/utils";

export interface InteractiveImageProps {
  className?: string;
  /** Background image for the hotspots */
  image?: AssetParamValue;
  /** Optional title above the image */
  title?: string;
  /** Optional description below the title */
  description?: string;
  /** Image aspect ratio (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string;
}

/**
 * InteractiveImage - Container for image with hotspots
 *
 * A container component that displays an image with interactive hotspots placed on top.
 * Hotspots can be positioned anywhere on the image to show product information or other content.
 *
 * Features:
 * - Background image with optimal loading
 * - Relative positioning for hotspot placement
 * - Optional title and description
 * - Configurable aspect ratio
 * - Responsive design
 * - Hotspots slot for adding multiple hotspot components
 * - All content editable via Uniform
 *
 * Use Cases:
 * - Shoppable lifestyle images
 * - Room scene product showcases
 * - Interactive product galleries
 * - Feature callout images
 * - Educational diagrams
 *
 * Design Notes:
 * - Uses relative positioning for hotspot absolute positioning
 * - Default aspect ratio is 16/9 (widescreen)
 * - Image fills container using object-cover
 * - Hotspots are added via the "hotspots" slot
 * - Each hotspot can be positioned independently
 */
export const InteractiveImage: React.FC<InteractiveImageProps> = ({
  className = "",
  image,
  aspectRatio = "16/9",
}) => {
  // Extract image
  const imageAssets = image ?? [];
  const [firstAsset] = imageAssets;
  const focalPoint = firstAsset?.fields?.focalPoint?.value;

  const imageUrl = getTransformedImageUrl(firstAsset, {
    width: 1920,
    height: 1080,
    fit: "cover",
    focal: focalPoint || "center",
    quality: 85,
  });

  const imageAlt =
    firstAsset?.fields?.description?.value ||
    firstAsset?.fields?.title?.value ||
    "Interactive image";

  return (
    <section className={cn("py-16 px-6", className)}>
      <div className="max-w-7xl mx-auto">
        {/* Title and Description */}
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            <UniformText
              parameterId="title"
              placeholder="Interactive Image Title"
              as="span"
            />
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <UniformText
              parameterId="description"
              placeholder="Add a description for this interactive image..."
              as="span"
            />
          </p>
        </div>

        {/* Interactive Image Container */}
        <div className="relative w-full">
          {/* Background Image */}
          <div
            className="relative w-full overflow-hidden rounded-lg shadow-xl bg-muted"
            style={{ aspectRatio: aspectRatio }}
          >
            {imageUrl ? (
              <NextImage
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1920px"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground">
                  Select an image in the panel →
                </p>
              </div>
            )}
          </div>

          {/* Hotspots Layer - Positioned over image but not clipped */}
          <div className="absolute inset-0">
            <UniformSlot name="hotspots" />
          </div>
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "interactiveImage",
  component: InteractiveImage,
});

export default InteractiveImage;

