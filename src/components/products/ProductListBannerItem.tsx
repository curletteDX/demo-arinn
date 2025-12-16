"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UniformText,
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-react";
import type { AssetParamValue } from "@uniformdev/assets";
import { getTransformedImageUrl } from "@/utilities/canvas/imageTransform";

export interface ProductListBannerItemProps extends ComponentProps {
  /** Product image */
  image?: AssetParamValue;
  /** Product title displayed below the image */
  title?: string;
  /** Product subtitle/category */
  subtitle?: string;
  /** Optional link URL for the product */
  href?: {
    type: string;
    path?: string;
    url?: string;
  };
  /** Tooltip text shown on hover */
  tooltipName?: string;
  /** Whether this item is currently hovered (managed by parent) */
  isHovered?: boolean;
  /** Callback when hover state changes */
  onHoverChange?: (isHovered: boolean) => void;
}

/**
 * ProductListBannerItem - Individual product card for the ProductListBanner
 *
 * Displays a product image with title, subtitle, and optional tooltip on hover.
 * Can be wrapped in a link for navigation.
 *
 * Features:
 * - Responsive image display with 4:3 aspect ratio
 * - Hover tooltip showing product name
 * - Optional link wrapping for navigation
 * - Subtle hover animation
 *
 * Use Cases:
 * - Featured product displays
 * - Category showcase banners
 * - Collection highlights
 */
export const ProductListBannerItem: React.FC<ProductListBannerItemProps> = ({
  image,
  title,
  subtitle,
  href,
  tooltipName,
  isHovered = false,
  onHoverChange,
}) => {
  const [localHovered, setLocalHovered] = useState(false);
  const showTooltip = isHovered || localHovered;

  // Extract image from asset array
  const imageAssets = image ?? [];
  const [firstAsset] = imageAssets;
  const focalPoint = firstAsset?.fields?.focalPoint?.value;

  const imageUrl = getTransformedImageUrl(firstAsset, {
    width: 400,
    height: 300,
    fit: "contain",
    focal: focalPoint || "center",
    quality: 85,
  });

  const imageAlt =
    firstAsset?.fields?.description?.value ||
    firstAsset?.fields?.title?.value ||
    title ||
    "Product image";

  // Resolve link URL
  const linkUrl = href?.path || href?.url;

  const handleMouseEnter = () => {
    setLocalHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setLocalHovered(false);
    onHoverChange?.(false);
  };

  const CardContent = (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] mb-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        )}

        {/* Hover Tooltip */}
        {tooltipName && showTooltip && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 bg-white px-3 py-1.5 shadow-md rounded-sm whitespace-nowrap z-10">
            <span className="text-xs text-gray-800">{tooltipName}</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h3 className="text-[9px] md:text-[10px] font-medium tracking-[0.15em] text-gray-900 uppercase leading-tight mb-0.5">
          <UniformText parameterId="title" placeholder="Product Title" as="span" />
        </h3>
        <p className="text-[8px] md:text-[9px] tracking-[0.1em] text-gray-600 uppercase">
          <UniformText parameterId="subtitle" placeholder="Subtitle" as="span" />
        </p>
      </div>
    </div>
  );

  return linkUrl ? (
    <Link
      href={linkUrl}
      className="group block transition-transform hover:scale-[1.02]"
    >
      {CardContent}
    </Link>
  ) : (
    <div className="block">{CardContent}</div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "productListBannerItem",
  component: ProductListBannerItem,
});

export default ProductListBannerItem;

