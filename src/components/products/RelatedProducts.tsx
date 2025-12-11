import React from "react";
import Link from "next/link";
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";

/**
 * Link parameter type from Uniform
 */
interface UniformLink {
  type: string;
  path?: string;
  url?: string;
}

export interface RelatedProductsProps {
  className?: string;
  /** Section title */
  title?: string;
  /** Link text for view all */
  viewAllText?: string;
  /** Link to all products page */
  viewAllLink?: UniformLink;
}

/**
 * RelatedProducts - Product recommendation section
 *
 * A section component designed to display related or recommended products.
 * Perfect for product detail pages, cart pages, and cross-selling opportunities.
 *
 * Features:
 * - Configurable section title
 * - View all link to product listing
 * - Grid layout for product cards (2 columns on mobile, 4 on desktop)
 * - Uses UniformSlot to allow adding ProductCard components
 * - Responsive design with proper spacing
 * - All content editable via Uniform
 *
 * Use Cases:
 * - Related products on product detail pages
 * - "You may also like" recommendations
 * - Recently viewed products
 * - Cross-sell sections on cart/checkout
 *
 * Design Notes:
 * - Uses slot "products" for ProductCard components
 * - Responsive grid: 2 cols mobile, 4 cols desktop
 * - Clean header with title and optional view all link
 */
export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  className = "",
  viewAllLink,
}) => {
  // Extract link path
  const href = viewAllLink?.path || viewAllLink?.url || "/products";

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with title and view all link */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            <UniformText
              parameterId="title"
              placeholder="You May Also Like"
              as="span"
            />
          </h2>
          <Link
            href={href}
            className="text-sm font-medium text-primary hover:underline"
          >
            <UniformText
              parameterId="viewAllText"
              placeholder="View All"
              as="span"
            />
          </Link>
        </div>

        {/* Products Grid - uses slot for ProductCard components */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <UniformSlot name="products" />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "relatedProducts",
  component: RelatedProducts,
});

export default RelatedProducts;
