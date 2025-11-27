import React from "react";
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";

export interface ProductGridProps {
  className?: string;
  /** Optional title/headline for the grid */
  title?: string;
}

/**
 * ProductGrid - Layout Container for Product Cards
 *
 * A responsive grid layout component designed specifically for displaying
 * product cards in a clean, organized grid. Perfect for product listing pages,
 * category pages, and featured product sections.
 *
 * Features:
 * - Editable grid title (optional)
 * - Responsive grid layout (1 column mobile → 2 tablet → 3 desktop)
 * - UniformSlot for adding product cards dynamically
 * - Consistent spacing and alignment
 * - Background section styling
 *
 * Grid Behavior:
 * - Mobile: 1 column (stacked)
 * - Tablet (md): 2 columns
 * - Desktop (lg): 3 columns
 *
 * Supported Product Types:
 * - ProductCard: Individual product display cards
 * - Any component registered to work in product slots
 *
 * Use Cases:
 * - Product listing pages (/products)
 * - Category pages (/products/sofas)
 * - Featured products sections
 * - Search results
 * - Related products
 *
 * This component works with Uniform patterns that use data resources
 * to fetch products from Uniform entries and display them in the grid.
 */
export const ProductGrid: React.FC<ProductGridProps> = ({
  className = "",
}) => {
  return (
    <section className={cn("py-16 px-6", className)}>
      <div className="max-w-7xl mx-auto">
        {/* GRID HEADER: Optional centered title for the entire grid */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <UniformText
              placeholder="Products"
              parameterId="title"
              as="span"
            />
          </h2>
        </div>

        {/* RESPONSIVE GRID: Automatically adjusts columns based on screen size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* UNIFORM SLOT: Product cards are added here via patterns or manually */}
          {/* Patterns using data resources will populate this slot with ProductCard components */}
          <UniformSlot name="products" />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "productGrid",
  component: ProductGrid,
});

export default ProductGrid;
