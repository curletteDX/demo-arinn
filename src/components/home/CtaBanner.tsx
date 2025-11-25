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
import { ArrowRight } from "lucide-react";

/**
 * Link parameter type from Uniform
 */
interface UniformLink {
  type: string;
  path?: string;
  url?: string;
}

export interface CtaBannerProps {
  className?: string;
  /** Eyebrow text above headline */
  eyebrow?: string;
  /** Main headline */
  headline?: string;
  /** Supporting description text */
  description?: string;
  /** Primary CTA button text */
  primaryButtonText?: string;
  /** Primary CTA button link */
  primaryButtonLink?: UniformLink;
  /** Secondary CTA button text */
  secondaryButtonText?: string;
  /** Secondary CTA button link */
  secondaryButtonLink?: UniformLink;
  /** Background image */
  backgroundImage?: AssetParamValue;
  /** Overlay opacity (0-1) */
  overlayOpacity?: number;
}

/**
 * CtaBanner - Full-width call-to-action banner with background image
 *
 * A striking banner section with a full-bleed background image, dark overlay,
 * and prominent call-to-action buttons. Perfect for conversion-focused sections.
 *
 * Features:
 * - Full-width background image with overlay
 * - Centered content layout
 * - Eyebrow text for category/brand messaging
 * - Large serif headline
 * - Supporting description
 * - Dual CTA buttons (primary and secondary)
 * - Configurable overlay opacity
 * - All text editable via Uniform
 *
 * Design Notes:
 * - Uses dark overlay for text readability
 * - White text on dark background
 * - Serif font for elegant headlines
 * - Generous padding for visual impact
 */
export const CtaBanner: React.FC<CtaBannerProps> = ({
  className = "",
  primaryButtonLink,
  secondaryButtonLink,
  backgroundImage,
  overlayOpacity = 0.7,
}) => {
  // Extract background image
  const imageAssets = backgroundImage ?? [];
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
                  'Background image';

  // Extract link paths
  const primaryHref = primaryButtonLink?.path || primaryButtonLink?.url || "/products";
  const secondaryHref = secondaryButtonLink?.path || secondaryButtonLink?.url || "/about";

  // Calculate overlay opacity
  const safeOpacity = Math.max(0, Math.min(1, overlayOpacity || 0.7));
  const overlayStyle = {
    backgroundColor: `rgba(61, 52, 39, ${safeOpacity})`, // #3D3427 with opacity
  };

  return (
    <section className={cn("relative py-24 lg:py-32 overflow-hidden", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
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
          <div className="w-full h-full bg-foreground" />
        )}
        <div className="absolute inset-0" style={overlayStyle} />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <p className="text-sm font-medium uppercase tracking-widest text-white/70 mb-4">
          <UniformText
            parameterId="eyebrow"
            placeholder="The Arinn Promise"
            as="span"
          />
        </p>

        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
          <UniformText
            parameterId="headline"
            placeholder="Furniture worthy of your family's story"
            as="span"
          />
        </h2>

        {/* Description */}
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
          <UniformText
            parameterId="description"
            placeholder="Like the Viking arinn that warmed homes for generations, our furniture is built to become part of your family's legacy. 365-day trial. Lifetime frame warranty. Free white-glove delivery."
            as="span"
          />
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-foreground hover:bg-white/90"
            asChild
          >
            <Link href={primaryHref}>
              <UniformText
                parameterId="primaryButtonText"
                placeholder="Begin Your Story"
                as="span"
              />
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 bg-transparent"
            asChild
          >
            <Link href={secondaryHref}>
              <UniformText
                parameterId="secondaryButtonText"
                placeholder="Our Heritage"
                as="span"
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "ctaBanner",
  component: CtaBanner,
});

export default CtaBanner;

