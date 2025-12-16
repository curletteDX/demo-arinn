import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import { UniformText, registerUniformComponent } from "@uniformdev/canvas-react";
import type { AssetParamValue } from "@uniformdev/assets";
import { getTransformedImageUrl } from "@/utilities/canvas/imageTransform";
import { cn } from "@/lib/utils";

/**
 * Link parameter type from Uniform
 */
interface UniformLink {
  type: string;
  path?: string;
  url?: string;
}

export interface ShowcaseProductCardProps {
  className?: string;
  /** Product image */
  image?: AssetParamValue;
  /** Product title */
  title?: string;
  /** Product subtitle/category */
  subtitle?: string;
  /** Link to product */
  link?: UniformLink;
}

/**
 * ShowcaseProductCard - Compact product card for showcase grids
 *
 * A minimal product card with square image, title, and subtitle.
 * Used within ColorShowcaseBlock for featuring collection products.
 *
 * Features:
 * - Square aspect ratio image
 * - Hover zoom effect
 * - Optional link wrapper
 * - Uppercase text styling
 */
export const ShowcaseProductCard: React.FC<ShowcaseProductCardProps> = ({
  className = "",
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

  const imageAlt =
    firstAsset?.fields?.description?.value ||
    firstAsset?.fields?.title?.value ||
    "Product image";

  // Extract link path
  const href = link?.path || link?.url;

  const content = (
    <>
      <div className="relative aspect-square overflow-hidden mb-2">
        {imageUrl ? (
          <NextImage
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 200px"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        )}
      </div>
      <p className="text-[11px] sm:text-xs font-medium text-foreground uppercase tracking-wide">
        <UniformText parameterId="title" placeholder="Product Name" as="span" />
      </p>
      <p className="text-[11px] sm:text-xs text-muted-foreground uppercase tracking-wide">
        <UniformText parameterId="subtitle" placeholder="Category" as="span" />
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("group block", className)}>
        {content}
      </Link>
    );
  }

  return <div className={cn("group", className)}>{content}</div>;
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "showcaseProductCard",
  component: ShowcaseProductCard,
});

export default ShowcaseProductCard;

