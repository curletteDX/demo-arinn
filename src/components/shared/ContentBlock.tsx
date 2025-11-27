import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  UniformText,
  UniformRichText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import type { AssetParamValue } from "@uniformdev/assets";
import { getTransformedImageUrl } from "@/utilities/canvas/imageTransform";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { resolveRichTextRenderer } from "@/lib/richTextRenderers";

/**
 * Link parameter type from Uniform
 */
interface UniformLink {
  type: string;
  path?: string;
  url?: string;
}

export interface ContentBlockProps {
  className?: string;
  /** Main headline */
  headline?: string;
  /** Rich text content */
  content?: string;
  /** Image asset */
  image?: AssetParamValue;
  /** CTA button text */
  ctaText?: string;
  /** CTA button link */
  ctaLink?: UniformLink;
  /** Image position relative to content */
  imagePosition?: "left" | "right";
  /** Background color variant */
  backgroundColor?: "default" | "warm" | "muted";
  /** Headline font family */
  headlineFont?: "serif" | "sans";
  /** Headline size scale */
  headlineSize?: "small" | "medium" | "large" | "xlarge";
  /** Content text alignment */
  textAlignment?: "left" | "center" | "right";
  /** Vertical spacing/padding */
  spacing?: "compact" | "standard" | "spacious";
  /** Gap between columns */
  columnGap?: "small" | "medium" | "large";
  /** Content width constraint */
  contentWidth?: "narrow" | "standard" | "wide";
  /** Image border radius */
  imageBorderRadius?: "none" | "small" | "medium" | "large";
  /** Image aspect ratio */
  imageAspectRatio?: "square" | "4:3" | "16:9" | "3:2";
  /** CTA button style */
  ctaButtonStyle?: "primary" | "secondary" | "outline";
  /** Show/hide CTA button */
  showCta?: boolean;
}

/**
 * ContentBlock - Two-column content section with image and rich text
 *
 * A flexible content section that displays a headline, rich text content,
 * and an image side-by-side. Perfect for feature sections, about pages,
 * and content-heavy areas.
 *
 * Features:
 * - Two-column grid layout (content + image)
 * - Configurable image position (left or right)
 * - Rich text content with formatting
 * - Optional CTA button
 * - Background color variants
 * - Responsive design (stacks on mobile)
 * - All content editable via Uniform
 *
 * Design Notes:
 * - Uses serif font for headlines
 * - Prose styling for rich text content
 * - Rounded image corners
 * - Flexible spacing and padding
 */
export const ContentBlock: React.FC<ContentBlockProps> = ({
  className = "",
  image,
  ctaLink,
  imagePosition = "right",
  backgroundColor = "default",
  headlineFont = "serif",
  headlineSize = "medium",
  textAlignment = "left",
  spacing = "standard",
  columnGap = "medium",
  contentWidth = "standard",
  imageBorderRadius = "medium",
  imageAspectRatio = "4:3",
  ctaButtonStyle = "primary",
  showCta = true,
}) => {
  // Extract image
  const imageAssets = image ?? [];
  const [firstAsset] = imageAssets;
  const focalPoint = firstAsset?.fields?.focalPoint?.value;

  const imageUrl = getTransformedImageUrl(firstAsset, {
    width: 800,
    height: 600,
    fit: "cover",
    focal: focalPoint || "center",
    quality: 85,
  });

  const imageAlt = firstAsset?.fields?.description?.value ||
                  firstAsset?.fields?.title?.value ||
                  'Content image';

  // Extract link path
  const href = ctaLink?.path || ctaLink?.url || "#";

  // Background color classes
  const backgroundClasses = {
    default: "bg-background",
    warm: "bg-muted/30",
    muted: "bg-muted/50",
  };

  // Spacing classes
  const spacingClasses = {
    compact: "py-12 md:py-16",
    standard: "py-16 md:py-24",
    spacious: "py-20 md:py-32",
  };

  // Column gap classes
  const gapClasses = {
    small: "gap-8 lg:gap-12",
    medium: "gap-12 lg:gap-16",
    large: "gap-16 lg:gap-24",
  };

  // Content width classes
  const contentWidthClasses = {
    narrow: "max-w-2xl",
    standard: "max-w-none",
    wide: "max-w-full",
  };

  // Headline font classes
  const headlineFontClasses = {
    serif: "font-serif",
    sans: "font-sans",
  };

  // Headline size classes
  const headlineSizeClasses = {
    small: "text-2xl md:text-3xl",
    medium: "text-3xl md:text-4xl",
    large: "text-4xl md:text-5xl",
    xlarge: "text-5xl md:text-6xl",
  };

  // Text alignment classes
  const textAlignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  // Image border radius classes
  const imageRadiusClasses = {
    none: "rounded-none",
    small: "rounded-md",
    medium: "rounded-lg",
    large: "rounded-xl",
  };

  // Image aspect ratio classes
  const imageAspectClasses = {
    square: "aspect-square",
    "4:3": "aspect-[4/3]",
    "16:9": "aspect-[16/9]",
    "3:2": "aspect-[3/2]",
  };

  // CTA button variant
  const ctaVariant = ctaButtonStyle === "secondary" ? "secondary" :
                     ctaButtonStyle === "outline" ? "outline" : "default";

  // Content and image order based on position
  const contentOrder = imagePosition === "left" ? "lg:order-2" : "lg:order-1";
  const imageOrder = imagePosition === "left" ? "lg:order-1" : "lg:order-2";

  return (
    <section className={cn(spacingClasses[spacing], backgroundClasses[backgroundColor], className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={cn("grid lg:grid-cols-2 items-center", gapClasses[columnGap])}>
          {/* Content */}
          <div className={cn(contentOrder, textAlignClasses[textAlignment])}>
            <div className={contentWidth !== "standard" ? contentWidthClasses[contentWidth] : ""}>
              <h2 className={cn(
                headlineFontClasses[headlineFont],
                headlineSizeClasses[headlineSize],
                "font-bold text-foreground mb-6"
              )}>
                <UniformText
                  parameterId="headline"
                  placeholder="Content Headline"
                  as="span"
                />
              </h2>

              {/* Rich text content */}
              <div className={cn(
                "prose prose-lg text-muted-foreground max-w-none",
                "[&>p]:mb-4 [&>p]:leading-relaxed",
                "[&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4",
                "[&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4",
                "[&>li]:mb-2",
                "[&>strong]:text-foreground [&>strong]:font-semibold",
                "[&>a]:text-primary [&>a]:underline [&>a]:hover:text-primary/80"
              )}>
                <UniformRichText
                  parameterId="content"
                  placeholder="Add your content here..."
                  resolveRichTextRenderer={resolveRichTextRenderer}
                />
              </div>

              {showCta && ctaLink && (
                <Button
                  size="lg"
                  variant={ctaVariant}
                  className={cn(
                    "mt-8",
                    ctaButtonStyle === "primary" && "bg-primary hover:bg-primary/90 text-primary-foreground",
                    ctaButtonStyle === "secondary" && "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
                    ctaButtonStyle === "outline" && "border-primary text-primary hover:bg-primary/10"
                  )}
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
          </div>

          {/* Image */}
          <div className={imageOrder}>
            <div className={cn(
              "relative overflow-hidden bg-muted",
              imageAspectClasses[imageAspectRatio],
              imageRadiusClasses[imageBorderRadius]
            )}>
              {imageUrl ? (
                <NextImage
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-muted-foreground">Select an image →</p>
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
  type: "contentBlock",
  component: ContentBlock,
});

export default ContentBlock;

