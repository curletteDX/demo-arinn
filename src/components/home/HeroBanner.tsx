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

export interface HeroBannerProps {
  className?: string;
  /** Eyebrow text above headline (e.g., "The Modern Hearth") */
  eyebrow?: string;
  /** Main headline text */
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
  /** Hero image asset */
  heroImage?: AssetParamValue;
  /** Feature 1 title */
  feature1Title?: string;
  /** Feature 1 description */
  feature1Description?: string;
  /** Feature 2 title */
  feature2Title?: string;
  /** Feature 2 description */
  feature2Description?: string;
  /** Feature 3 title */
  feature3Title?: string;
  /** Feature 3 description */
  feature3Description?: string;
}

/**
 * HeroBanner - Main hero section for the homepage
 *
 * A stunning hero banner inspired by the Arinn furniture brand's Viking hearth theme.
 * Features a two-column layout with compelling copy on the left and a large
 * lifestyle image on the right.
 *
 * Features:
 * - Eyebrow text for category/brand messaging
 * - Large serif headline for elegant typography
 * - Supporting description text
 * - Dual CTA buttons (primary and secondary)
 * - Full-bleed lifestyle image with rounded corners
 * - Three feature highlights with trust signals
 * - Fully responsive design
 *
 * Design Notes:
 * - Uses warm earth tones from the furniture theme
 * - Libre Baskerville serif font for headlines
 * - Inter sans-serif for body text
 * - Warm amber/brown accent colors
 */
export const HeroBanner: React.FC<HeroBannerProps> = ({
  className = "",
  primaryButtonLink,
  secondaryButtonLink,
  heroImage,
}) => {
  // Extract hero image
  const imageAssets = heroImage ?? [];
  const [firstAsset] = imageAssets;
  const focalPoint = firstAsset?.fields?.focalPoint?.value;

  const imageUrl = getTransformedImageUrl(firstAsset, {
    width: 1200,
    height: 1200,
    fit: "cover",
    focal: focalPoint || "center",
    quality: 90,
  });

  const imageAlt = firstAsset?.fields?.description?.value ||
                  firstAsset?.fields?.title?.value ||
                  'Modern living room featuring elegant furniture';

  // Extract link paths
  const primaryHref = primaryButtonLink?.path || primaryButtonLink?.url || "/products";
  const secondaryHref = secondaryButtonLink?.path || secondaryButtonLink?.url || "/inspiration";

  return (
    <section className={cn("relative", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 py-12 lg:py-20 items-center">
          {/* Content - Viking hearth-inspired messaging */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
              <UniformText
                parameterId="eyebrow"
                placeholder="The Modern Hearth"
                as="span"
              />
            </p>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance mb-6">
              <UniformText
                parameterId="headline"
                placeholder="Where families gather, stories begin"
                as="span"
              />
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              <UniformText
                parameterId="description"
                placeholder="Inspired by the ancient Viking arinn—the sacred hearth at the center of every home. We craft furniture that brings people together, built to witness generations of memories."
                as="span"
              />
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <Link href={primaryHref}>
                  <UniformText
                    parameterId="primaryButtonText"
                    placeholder="Explore the Collection"
                    as="span"
                  />
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                asChild
              >
                <Link href={secondaryHref}>
                  <UniformText
                    parameterId="secondaryButtonText"
                    placeholder="Find Inspiration"
                    as="span"
                  />
                </Link>
              </Button>
            </div>

            {/* Trust Features */}
            <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-border">
              <div className="text-sm">
                <p className="font-semibold text-foreground">
                  <UniformText
                    parameterId="feature1Title"
                    placeholder="365-Day Home Trial"
                    as="span"
                  />
                </p>
                <p className="text-muted-foreground">
                  <UniformText
                    parameterId="feature1Description"
                    placeholder="Live with it, love it"
                    as="span"
                  />
                </p>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-foreground">
                  <UniformText
                    parameterId="feature2Title"
                    placeholder="Heirloom Warranty"
                    as="span"
                  />
                </p>
                <p className="text-muted-foreground">
                  <UniformText
                    parameterId="feature2Description"
                    placeholder="Built for generations"
                    as="span"
                  />
                </p>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-foreground">
                  <UniformText
                    parameterId="feature3Title"
                    placeholder="White-Glove Delivery"
                    as="span"
                  />
                </p>
                <p className="text-muted-foreground">
                  <UniformText
                    parameterId="feature3Description"
                    placeholder="Placed with care"
                    as="span"
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl bg-secondary">
              {imageUrl ? (
                <NextImage
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <p>Select a hero image in the panel →</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "heroBanner",
  component: HeroBanner,
});

export default HeroBanner;

