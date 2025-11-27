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
import { Button } from "@/components/ui/button";

/**
 * Link parameter type from Uniform
 */
interface UniformLink {
  type: string;
  path?: string;
  url?: string;
}

export interface PageHeroProps {
  className?: string;
  /** Main headline */
  headline?: string;
  /** Hero image asset */
  image?: AssetParamValue;
  /** CTA button text */
  ctaText?: string;
  /** CTA button link */
  ctaLink?: UniformLink;
  /** Overlay opacity level */
  overlayOpacity?: "none" | "light" | "medium" | "dark";
}

/**
 * PageHero - Full-width hero section for page headers
 *
 * A striking hero section with background image, overlay, and prominent headline.
 * Perfect for page headers and landing sections.
 *
 * Features:
 * - Full-width background image
 * - Configurable overlay opacity
 * - Large serif headline
 * - Optional CTA button
 * - Responsive height (50vh, min 400px, max 600px)
 * - All text editable via Uniform
 *
 * Design Notes:
 * - Uses dark overlay for text readability
 * - White text on dark background
 * - Serif font for elegant headlines
 * - Content positioned at bottom
 */
export const PageHero: React.FC<PageHeroProps> = ({
  className = "",
  image,
  ctaLink,
  overlayOpacity = "light",
}) => {
  // Extract image
  const imageAssets = image ?? [];
  const [firstAsset] = imageAssets;
  const focalPoint = firstAsset?.fields?.focalPoint?.value;

  const imageUrl = getTransformedImageUrl(firstAsset, {
    width: 1920,
    height: 800,
    fit: "cover",
    focal: focalPoint || "center",
    quality: 85,
  });

  const imageAlt = firstAsset?.fields?.description?.value ||
                  firstAsset?.fields?.title?.value ||
                  'Hero image';

  // Extract link path
  const href = ctaLink?.path || ctaLink?.url || "#";

  // Overlay opacity classes
  const overlayClasses = {
    none: "",
    light: "bg-black/20",
    medium: "bg-black/40",
    dark: "bg-black/60",
  };

  return (
    <section className={cn("relative w-full h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden", className)}>
      {/* Background Image */}
      {imageUrl ? (
        <NextImage
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover w-full h-full"
          sizes="100vw"
          priority
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-foreground" />
      )}

      {/* Overlay */}
      <div className={cn("absolute inset-0", overlayClasses[overlayOpacity])} />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-12 lg:p-16">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-2xl text-balance">
          <UniformText
            parameterId="headline"
            placeholder="What's new at Arinn?"
            as="span"
          />
        </h1>
        {ctaLink && (
          <Button
            size="lg"
            className="mt-6 w-fit bg-white text-primary hover:bg-white/90"
            asChild
          >
            <Link href={href}>
              <UniformText
                parameterId="ctaText"
                placeholder="Learn More"
                as="span"
              />
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "pageHero",
  component: PageHero,
});

export default PageHero;

