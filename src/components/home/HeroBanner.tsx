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
  /** Image position: left or right */
  imagePosition?: "left" | "right";
  /** Image aspect ratio */
  imageAspectRatio?: "square" | "4:3" | "16:9";
  /** Show/hide trust badges */
  showTrustBadges?: boolean;
  /** Show/hide secondary CTA */
  showSecondaryCta?: boolean;
  /** Background style */
  backgroundStyle?: "default" | "warm" | "muted";
  /** Text alignment */
  textAlignment?: "left" | "center" | "right";
  /** Content width */
  contentWidth?: "narrow" | "standard" | "wide";
  /** Spacing/padding */
  spacing?: "compact" | "standard" | "spacious";
  /** Image border radius */
  imageBorderRadius?: "none" | "small" | "medium" | "large";
  /** CTA button style */
  ctaButtonStyle?: "default" | "outline" | "ghost";
  /** Typography scale */
  typographyScale?: "small" | "medium" | "large";
  /** Image overlay */
  imageOverlay?: boolean;
  /** Trust badges layout */
  trustBadgesLayout?: "horizontal" | "vertical" | "grid";
  /** Eyebrow style */
  eyebrowStyle?: "default" | "accent" | "subtle";
  /** Section padding */
  sectionPadding?: "none" | "small" | "medium" | "large";
}

/**
 * HeroBanner - Main hero section for the homepage
 *
 * A stunning hero banner inspired by the Arinn furniture brand's Viking hearth theme.
 * Features a two-column layout with compelling copy and a large lifestyle image.
 * Now includes flexible design options for layout, styling, and content visibility.
 *
 * Features:
 * - Eyebrow text for category/brand messaging
 * - Large serif headline for elegant typography
 * - Supporting description text
 * - Dual CTA buttons (primary and secondary, with show/hide option)
 * - Full-bleed lifestyle image with configurable position and aspect ratio
 * - Three feature highlights with trust signals (show/hide option)
 * - Configurable background styles
 * - Fully responsive design
 *
 * Design Options:
 * - Image position: left or right
 * - Image aspect ratio: square, 4:3, or 16:9
 * - Background style: default, warm, or muted
 * - Show/hide trust badges
 * - Show/hide secondary CTA
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
  imagePosition = "right",
  imageAspectRatio = "square",
  showTrustBadges = true,
  showSecondaryCta = true,
  backgroundStyle = "default",
  textAlignment = "left",
  contentWidth = "standard",
  spacing = "standard",
  imageBorderRadius = "large",
  ctaButtonStyle = "default",
  typographyScale = "medium",
  imageOverlay = false,
  trustBadgesLayout = "horizontal",
  eyebrowStyle = "default",
  sectionPadding = "standard",
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

  // Background style classes
  const backgroundClasses = {
    default: "",
    warm: "bg-[oklch(0.98_0.005_75)]", // Using warm background from theme
    muted: "bg-muted/50",
  };

  // Aspect ratio classes
  const aspectClasses = {
    square: "lg:aspect-square",
    "4:3": "lg:aspect-[4/3]",
    "16:9": "lg:aspect-[16/9]",
  };

  // Text alignment classes
  const textAlignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  // Content width classes
  const contentWidthClasses = {
    narrow: "max-w-2xl",
    standard: "max-w-lg",
    wide: "max-w-2xl",
  };

  // Spacing classes
  const spacingClasses = {
    compact: "py-8 lg:py-12",
    standard: "py-12 lg:py-20",
    spacious: "py-16 lg:py-24",
  };

  // Image border radius classes
  const imageBorderRadiusClasses = {
    none: "rounded-none",
    small: "rounded-lg",
    medium: "rounded-xl",
    large: "rounded-2xl",
  };

  // Typography scale classes
  const typographyScaleClasses = {
    small: "text-3xl sm:text-4xl lg:text-5xl",
    medium: "text-4xl sm:text-5xl lg:text-6xl",
    large: "text-5xl sm:text-6xl lg:text-7xl",
  };

  // Trust badges layout classes
  const trustBadgesLayoutClasses = {
    horizontal: "flex flex-wrap gap-6",
    vertical: "flex flex-col gap-4",
    grid: "grid grid-cols-1 sm:grid-cols-3 gap-6",
  };

  // Eyebrow style classes
  const eyebrowStyleClasses = {
    default: "text-sm font-medium uppercase tracking-widest text-primary",
    accent: "text-sm font-medium uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full inline-block",
    subtle: "text-xs font-normal tracking-wide text-muted-foreground",
  };

  // Section padding classes
  const sectionPaddingClasses = {
    none: "",
    small: "px-4 sm:px-6 lg:px-8",
    medium: "px-6 sm:px-8 lg:px-12",
    large: "px-8 sm:px-12 lg:px-16",
  };

  // Content and image order based on position
  const contentOrder = imagePosition === "left" ? "order-2" : "order-2 lg:order-1";
  const imageOrder = imagePosition === "left" ? "order-1" : "order-1 lg:order-2";

  return (
    <section className={cn("relative", backgroundClasses[backgroundStyle], spacingClasses[spacing], className)}>
      <div className={cn("mx-auto max-w-7xl", sectionPaddingClasses[sectionPadding])}>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className={cn(contentOrder, textAlignmentClasses[textAlignment])}>
            {/* Eyebrow */}
            <p className={cn(eyebrowStyleClasses[eyebrowStyle], "mb-4 mt-0")}>
              <UniformText
                parameterId="eyebrow"
                placeholder="The Modern Hearth"
                as="span"
              />
            </p>

            {/* Headline */}
            <h1 className={cn("font-serif font-bold text-foreground leading-tight text-balance mb-6", typographyScaleClasses[typographyScale])}>
              <UniformText
                parameterId="headline"
                placeholder="Where families gather, stories begin"
                as="span"
              />
            </h1>

            {/* Description */}
            <p className={cn("text-lg text-muted-foreground mb-8 leading-relaxed", contentWidthClasses[contentWidth], textAlignment === "center" && "mx-auto", textAlignment === "right" && "ml-auto")}>
              <UniformText
                parameterId="description"
                placeholder="Inspired by the ancient Viking arinn—the sacred hearth at the center of every home. We craft furniture that brings people together, built to witness generations of memories."
                as="span"
              />
            </p>

            {/* CTA Buttons */}
            <div className={cn("flex flex-wrap gap-4", textAlignment === "center" && "justify-center", textAlignment === "right" && "justify-end")}>
              <Button
                size="lg"
                variant={ctaButtonStyle === "outline" ? "outline" : ctaButtonStyle === "ghost" ? "ghost" : "default"}
                className={ctaButtonStyle === "default" ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""}
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
              {showSecondaryCta && (
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
              )}
            </div>

            {/* Trust Features */}
            {showTrustBadges && (
              <div className={cn(trustBadgesLayoutClasses[trustBadgesLayout], "mt-8 pt-8 border-t border-border")}>
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
            )}
          </div>

          {/* Hero Image */}
          <div className={imageOrder}>
            <div
              className={cn(
                "relative aspect-[4/3] overflow-hidden bg-secondary",
                aspectClasses[imageAspectRatio],
                imageBorderRadiusClasses[imageBorderRadius]
              )}
            >
              {imageUrl ? (
                <>
                  <NextImage
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  {imageOverlay && (
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                  )}
                </>
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
