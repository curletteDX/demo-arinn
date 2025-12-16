"use client";

import React from "react";
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";

export interface ProductListBannerProps extends ComponentProps {
  /** Banner headline text */
  headline?: string;
  /** Background color (hex or CSS color) */
  backgroundColor?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ProductListBanner - Horizontal product showcase banner
 *
 * A full-width banner component that displays a collection of products
 * in a responsive grid layout. Perfect for highlighting featured products,
 * collections, or categories.
 *
 * Features:
 * - Customizable headline text
 * - Configurable background color
 * - Responsive grid that adapts to product count (up to 5 columns)
 * - Border styling for visual separation
 * - Slot for ProductListBannerItem children
 *
 * Use Cases:
 * - "Our Favorite Pieces" product showcases
 * - Category highlights on landing pages
 * - Featured collection banners
 * - Seasonal product promotions
 */
export const ProductListBanner: React.FC<ProductListBannerProps> = ({
  headline,
  backgroundColor = "#E8E4DE",
  className = "",
}) => {
  return (
    <section
      className={cn("py-16 md:py-20 border-y border-gray-200", className)}
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <h2 className="text-center font-bold text-base md:text-lg tracking-wide text-gray-900 mb-12 md:mb-16 uppercase">
          <UniformText
            parameterId="headline"
            placeholder="OUR FAVORITE PIECES TO UNWIND ON"
            as="span"
          />
        </h2>

        {/* Product Grid - Using UniformSlot for items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          <UniformSlot name="items" />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "productListBanner",
  component: ProductListBanner,
});

export default ProductListBanner;

