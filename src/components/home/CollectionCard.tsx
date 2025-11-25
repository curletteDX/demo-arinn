import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  UniformText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import type { AssetParamValue } from "@uniformdev/assets";
import { getTransformedImageUrl } from "@/utilities/canvas/imageTransform";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

/**
 * Link parameter type from Uniform
 */
interface UniformLink {
  type: string;
  path?: string;
  url?: string;
}

export interface CollectionCardProps {
  className?: string;
  /** Collection name (e.g., "Sofas") */
  name?: string;
  /** Short description (e.g., "Sink into comfort") */
  description?: string;
  /** Number of products in collection */
  productCount?: string;
  /** Link to collection page */
  collectionLink?: UniformLink;
  /** Collection image */
  collectionImage?: AssetParamValue;
}

/**
 * CollectionCard - Individual collection card for Featured Collections
 *
 * A visually striking card component that showcases a furniture collection
 * with a full-bleed image, gradient overlay, and hover effects.
 *
 * Features:
 * - Full-bleed lifestyle image with aspect ratio 4:5
 * - Gradient overlay for text readability
 * - Hover zoom effect on image
 * - Product count badge
 * - Animated "Shop Now" CTA
 * - All text editable via Uniform
 *
 * Design Notes:
 * - Uses serif font for collection name (elegant feel)
 * - White text on dark gradient for contrast
 * - Smooth hover transitions
 */
export const CollectionCard: React.FC<CollectionCardProps> = ({
  className = "",
  collectionLink,
  collectionImage,
}) => {
  // Extract collection image
  const imageAssets = collectionImage ?? [];
  const [firstAsset] = imageAssets;
  const focalPoint = firstAsset?.fields?.focalPoint?.value;

  const imageUrl = getTransformedImageUrl(firstAsset, {
    width: 800,
    height: 1000,
    fit: "cover",
    focal: focalPoint || "center",
    quality: 85,
  });

  const imageAlt = firstAsset?.fields?.description?.value ||
                  firstAsset?.fields?.title?.value ||
                  'Collection image';

  // Extract link path
  const href = collectionLink?.path || collectionLink?.url || "/products";

  return (
    <Link
      href={href}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card block",
        className
      )}
    >
      {/* Image Container */}
      <div className="aspect-[4/5] overflow-hidden">
        {imageUrl ? (
          <NextImage
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <p className="text-muted-foreground">Select an image →</p>
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Product Count */}
        <p className="text-sm text-white/70 mb-1">
          <UniformText
            parameterId="productCount"
            placeholder="45"
            as="span"
          />
          {" Products"}
        </p>

        {/* Collection Name */}
        <h3 className="font-serif text-2xl font-bold text-white mb-1">
          <UniformText
            parameterId="name"
            placeholder="Sofas"
            as="span"
          />
        </h3>

        {/* Description */}
        <p className="text-white/80 mb-3">
          <UniformText
            parameterId="description"
            placeholder="Sink into comfort"
            as="span"
          />
        </p>

        {/* CTA */}
        <span className="inline-flex items-center text-sm font-medium text-white group-hover:gap-2 transition-all">
          Shop Now
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "collectionCard",
  component: CollectionCard,
});

export default CollectionCard;

