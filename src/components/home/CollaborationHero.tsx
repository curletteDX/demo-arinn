import React, { useState, useRef } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  UniformText,
  UniformSlot,
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

export interface CollaborationHeroProps {
  className?: string;
  /** Media type: image or video */
  mediaType?: "image" | "video";
  /** Background image asset from Uniform */
  backgroundImage?: AssetParamValue;
  /** Video URL for video media type */
  videoUrl?: string;
  /** Eyebrow text above headline */
  eyebrow?: string;
  /** Main headline text */
  headline?: string;
  /** Brand/accent text in headline */
  headlineAccent?: string;
  /** Supporting description text */
  description?: string;
  /** Primary CTA button text */
  ctaText?: string;
  /** Primary CTA button link */
  ctaLink?: UniformLink;
  /** Secondary CTA button text */
  secondaryCtaText?: string;
  /** Secondary CTA button link */
  secondaryCtaLink?: UniformLink;
  /** Featured color chip code (e.g., "17-1230") */
  featuredColorCode?: string;
  /** Featured color chip name (e.g., "Mocha Mousse") */
  featuredColorName?: string;
  /** Featured color chip hex value */
  featuredColorHex?: string;
  /** Show/hide color chips on the side */
  showColorChips?: boolean;
  /** Minimum height of the hero */
  minHeight?: "80vh" | "90vh" | "100vh";
}

/**
 * CollaborationHero - Stunning video/image hero banner with Pantone collaboration theme
 *
 * A full-bleed hero section that supports both video and image backgrounds with
 * elegant content overlay that fades out during video playback.
 *
 * Features:
 * - Full-screen video or image background
 * - Animated content overlay that fades during video playback
 * - Pantone color chips floating on the right side
 * - Featured color badge with brand integration
 * - Dual CTA buttons with elegant styling
 * - Responsive design with mobile optimizations
 *
 * Design Notes:
 * - Uses warm gradient overlay for text readability
 * - Framer Motion for smooth animations
 * - Content fades out when video is playing for immersive experience
 * - Pantone-style color swatches for brand collaboration showcase
 */
export const CollaborationHero: React.FC<CollaborationHeroProps> = ({
  className = "",
  mediaType = "image",
  backgroundImage,
  videoUrl,
  ctaLink,
  secondaryCtaLink,
  featuredColorCode = "17-1230",
  featuredColorName = "Mocha Mousse",
  featuredColorHex = "#A47148",
  showColorChips = true,
  minHeight = "90vh",
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Extract background image
  const imageAssets = backgroundImage ?? [];
  const [firstAsset] = imageAssets;
  const focalPoint = firstAsset?.fields?.focalPoint?.value;

  const imageUrl = getTransformedImageUrl(firstAsset, {
    width: 1920,
    height: 1080,
    fit: "cover",
    focal: focalPoint || "center",
    quality: 90,
  });

  const imageAlt =
    firstAsset?.fields?.description?.value ||
    firstAsset?.fields?.title?.value ||
    "Collaboration hero background";

  // Extract link paths
  const ctaHref = ctaLink?.path || ctaLink?.url || "#catalog";
  const secondaryCtaHref =
    secondaryCtaLink?.path || secondaryCtaLink?.url || "#colors";

  // Min height classes
  const minHeightClasses = {
    "80vh": "min-h-[80vh]",
    "90vh": "min-h-[90vh]",
    "100vh": "min-h-screen",
  };

  return (
    <section
      className={cn(
        "relative flex items-center overflow-hidden",
        minHeightClasses[minHeight],
        className
      )}
    >
      {/* Background media - image or video */}
      <div className="absolute inset-0">
        {mediaType === "video" && videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            poster={imageUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onPlaying={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            onEnded={() => setIsVideoPlaying(false)}
          />
        ) : imageUrl ? (
          <NextImage
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-50" />
        )}

        {/* Gradient overlay for text readability */}
        <AnimatePresence>
          {!isVideoPlaying && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/40 to-transparent"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Content - Fades out when video plays */}
      <AnimatePresence>
        {!isVideoPlaying && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24"
          >
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Eyebrow */}
                <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
                  <UniformText
                    parameterId="eyebrow"
                    placeholder="Exclusive Collaboration"
                    as="span"
                  />
                </p>

                {/* Headline */}
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-2">
                  <UniformText
                    parameterId="headline"
                    placeholder="Arinn × Pantone"
                    as="span"
                  />
                </h1>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
                  <UniformText
                    parameterId="headlineAccent"
                    placeholder="2025 Collection"
                    as="span"
                  />
                </h1>

                {/* Description */}
                <p className="text-lg text-muted-foreground mb-4 max-w-lg leading-relaxed">
                  <UniformText
                    parameterId="description"
                    placeholder="Introducing our curated collection featuring the 2025 Color of the Year. Embrace warmth, comfort, and sophisticated style."
                    as="span"
                  />
                </p>

                {/* Pantone badge */}
                <div className="flex items-center gap-3 mb-8 p-3 bg-white/80 backdrop-blur rounded-lg inline-flex shadow-sm">
                  <div
                    className="w-12 h-12 rounded"
                    style={{ backgroundColor: featuredColorHex }}
                  />
                  <div>
                    <p className="text-xs text-muted-foreground tracking-wider">
                      PANTONE {featuredColorCode}
                    </p>
                    <p className="font-bold text-foreground">
                      {featuredColorName}
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    asChild
                  >
                    <Link href={ctaHref}>
                      <UniformText
                        parameterId="ctaText"
                        placeholder="Shop the Collection"
                        as="span"
                      />
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                    asChild
                  >
                    <Link href={secondaryCtaHref}>
                      <UniformText
                        parameterId="secondaryCtaText"
                        placeholder="Explore Colors"
                        as="span"
                      />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pantone chips floating on right - Also fade out with video */}
      <AnimatePresence>
        {!isVideoPlaying && showColorChips && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 hidden lg:block"
          >
            {/* Slot for color chip items */}
            <div className="flex flex-col gap-4">
              <UniformSlot name="colorChips" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "collaborationHero",
  component: CollaborationHero,
});

export default CollaborationHero;

