import React from "react";
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";

export interface FeaturedCollectionsProps {
  className?: string;
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
}

/**
 * FeaturedCollections - Showcase furniture collections in a grid
 *
 * A section component that displays a grid of collection cards, allowing
 * users to browse different furniture categories like Sofas, Chairs, Tables.
 *
 * Features:
 * - Centered section header with title and description
 * - Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)
 * - Warm background color matching the furniture theme
 * - Slot for adding CollectionCard components
 * - All text editable via Uniform
 *
 * Design Notes:
 * - Uses warm cream background (#FAF7F2 equivalent in theme)
 * - Serif font for section title
 * - Generous padding for breathing room
 *
 * Slot:
 * - `collections`: Add CollectionCard components here
 */
export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  className = "",
}) => {
  return (
    <section className={cn("py-16 lg:py-24 bg-secondary", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <UniformText
              parameterId="title"
              placeholder="Find Your Perfect Piece"
              as="span"
            />
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <UniformText
              parameterId="description"
              placeholder="From statement sofas to accent chairs, discover furniture designed to transform any room into your sanctuary."
              as="span"
            />
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <UniformSlot name="collections" />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "featuredCollections",
  component: FeaturedCollections,
});

export default FeaturedCollections;

