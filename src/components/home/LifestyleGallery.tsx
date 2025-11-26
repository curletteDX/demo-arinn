import React from "react";
import Link from "next/link";
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
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

export interface LifestyleGalleryProps {
  className?: string;
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA button link */
  ctaLink?: UniformLink;
}

/**
 * LifestyleGallery - Masonry-style gallery of lifestyle images
 *
 * A visually rich gallery section showcasing real homes and furniture
 * in use. Features a masonry grid layout with varying image sizes.
 *
 * Features:
 * - Responsive masonry grid (2 cols mobile, 3 cols desktop)
 * - Flexible grid spans for visual interest
 * - Hover effects on images
 * - Header with title, description, and CTA button
 * - Slot for adding LifestyleGalleryItem components
 * - All text editable via Uniform
 *
 * Design Notes:
 * - Uses serif font for section title
 * - Clean, minimal layout
 * - Encourages social sharing (#MyArinn)
 *
 * Slot:
 * - `items`: Add LifestyleGalleryItem components here
 */
export const LifestyleGallery: React.FC<LifestyleGalleryProps> = ({
  className = "",
  ctaLink,
}) => {
  // Extract link path
  const href = ctaLink?.path || ctaLink?.url || "/inspiration";

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
              <UniformText
                parameterId="title"
                placeholder="Your Hearth, Your Story"
                as="span"
              />
            </h2>
            <p className="text-lg text-muted-foreground">
              <UniformText
                parameterId="description"
                placeholder="Real homes where families gather. Share yours with #MyArinn"
                as="span"
              />
            </p>
          </div>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 bg-transparent"
            asChild
          >
            <Link href={href}>
              <UniformText
                parameterId="ctaText"
                placeholder="View All Inspiration"
                as="span"
              />
            </Link>
          </Button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(200px,auto)] gap-4 lg:gap-6">
          <UniformSlot name="items" />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "lifestyleGallery",
  component: LifestyleGallery,
});

export default LifestyleGallery;

