import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  UniformText,
  UniformSlot,
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

export interface ColorShowcaseBlockProps {
  className?: string;
  /** Intro text displayed above the grid */
  introText?: string;
  /** Main feature image */
  mainImage?: AssetParamValue;
  /** Position of the main image */
  imagePosition?: "left" | "right";
  /** Show/hide the Pantone badge */
  showPantoneBadge?: boolean;
  /** Pantone year */
  pantoneYear?: string;
  /** Pantone code */
  pantoneCode?: string;
  /** Pantone color name */
  pantoneName?: string;
  /** Pantone color hex */
  pantoneColor?: string;
  /** Text card headline */
  textHeadline?: string;
  /** Text card description */
  textDescription?: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA button link */
  ctaLink?: UniformLink;
  /** Background color */
  backgroundColor?: "warm" | "white" | "muted";
}

/**
 * ColorShowcaseBlock - Feature block showcasing products with Pantone collaboration theme
 *
 * A visually rich section combining a large feature image with a grid of
 * product cards and promotional text. Includes an optional Pantone badge overlay.
 *
 * Features:
 * - Large hero image with optional left/right positioning
 * - Pantone Color of the Year badge overlay
 * - Grid of product cards (via slot)
 * - Promotional text block with CTA
 * - Configurable background color
 * - Responsive layout
 *
 * Design Notes:
 * - Clean, editorial layout inspired by fashion/furniture catalogs
 * - Asymmetric grid creates visual interest
 * - Pantone badge adds brand collaboration authenticity
 */
export const ColorShowcaseBlock: React.FC<ColorShowcaseBlockProps> = ({
  className = "",
  mainImage,
  imagePosition = "left",
  showPantoneBadge = true,
  pantoneYear = "2025",
  pantoneCode = "17-1230",
  pantoneName = "Mocha Mousse",
  pantoneColor = "#A47148",
  ctaLink,
  backgroundColor = "warm",
}) => {
  // Extract main image
  const imageAssets = mainImage ?? [];
  const [firstAsset] = imageAssets;
  const focalPoint = firstAsset?.fields?.focalPoint?.value;

  const imageUrl = getTransformedImageUrl(firstAsset, {
    width: 800,
    height: 1000,
    fit: "cover",
    focal: focalPoint || "center",
    quality: 90,
  });

  const imageAlt =
    firstAsset?.fields?.description?.value ||
    firstAsset?.fields?.title?.value ||
    "Featured collection image";

  // Extract link path
  const ctaHref = ctaLink?.path || ctaLink?.url || "#";

  const isImageLeft = imagePosition === "left";

  // Background color classes
  const backgroundClasses = {
    warm: "bg-[#FAF7F2]",
    white: "bg-white",
    muted: "bg-muted/30",
  };

  return (
    <section
      className={cn(
        "py-12 lg:py-16",
        backgroundClasses[backgroundColor],
        className
      )}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Intro Text */}
        <p className="text-center font-serif text-lg sm:text-xl lg:text-2xl text-primary leading-relaxed max-w-4xl mx-auto mb-10 lg:mb-12 text-balance">
          <UniformText
            parameterId="introText"
            placeholder="Our exclusive collection featuring the Pantone Color of the Year brings warmth and sophistication to every space."
            as="span"
          />
        </p>

        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
          {/* Main Image */}
          <div
            className={cn(
              "relative aspect-[4/5] lg:aspect-auto lg:row-span-2",
              !isImageLeft && "lg:order-2"
            )}
          >
            {imageUrl ? (
              <NextImage
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">Select main image →</span>
              </div>
            )}

            {/* Pantone Badge */}
            {showPantoneBadge && (
              <div
                className="absolute bottom-4 left-4 bg-white p-3 shadow-lg"
                style={{ minWidth: "120px" }}
              >
                <p className="text-[10px] text-muted-foreground mb-0.5">
                  Color of
                </p>
                <p className="text-[10px] text-muted-foreground">the Year</p>
                <p className="text-xl font-bold text-foreground mb-2">
                  {pantoneYear}
                </p>
                <div
                  className="w-full h-10 mb-2"
                  style={{ backgroundColor: pantoneColor }}
                />
                <p className="text-[10px] font-bold text-foreground">PANTONE</p>
                <p className="text-[10px] text-muted-foreground">
                  {pantoneCode}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {pantoneName}
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Cards + Text */}
          <div
            className={cn(
              "flex flex-col gap-5",
              !isImageLeft && "lg:order-1"
            )}
          >
            {/* Product Cards Grid */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <UniformSlot name="productCards" />
            </div>

            {/* Text Card */}
            <div className="flex-1 flex flex-col justify-center pt-2">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground uppercase tracking-wide mb-3">
                <UniformText
                  parameterId="textHeadline"
                  placeholder="THE COLLECTION"
                  as="span"
                />
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                <UniformText
                  parameterId="textDescription"
                  placeholder="Discover furniture that embodies the warmth and richness of Mocha Mousse. Each piece is crafted to bring comfort and style to your home."
                  as="span"
                />
              </p>
              <div>
                <Button
                  asChild
                  variant="outline"
                  className="border border-foreground text-foreground hover:bg-foreground hover:text-white px-6 py-2.5 text-xs font-medium tracking-widest uppercase bg-transparent rounded-none"
                >
                  <Link href={ctaHref}>
                    <UniformText
                      parameterId="ctaText"
                      placeholder="SHOP THE COLLECTION"
                      as="span"
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "colorShowcaseBlock",
  component: ColorShowcaseBlock,
});

export default ColorShowcaseBlock;

