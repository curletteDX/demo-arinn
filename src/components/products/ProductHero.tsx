import React from "react";
import {
  UniformText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";

export interface ProductHeroProps {
  className?: string;
  title?: string;
  description?: string;
}

/**
 * ProductHero - Hero section for product listing pages
 *
 * A clean, centered hero component designed for product category and listing pages.
 * Provides a prominent title and description to introduce the product section.
 *
 * Features:
 * - Editable title and description via Uniform
 * - Centered layout with responsive typography
 * - Subtle background for visual separation
 * - Clean, minimal design
 *
 * Use Cases:
 * - Product category pages (/products/sofas)
 * - Main products page (/products)
 * - Collection landing pages
 * - Filtered product listings
 */
export const ProductHero: React.FC<ProductHeroProps> = ({
  className = "",
  title = "Shop All Furniture",
  description = "Discover our complete collection of handcrafted furniture designed for modern living.",
}) => {
  return (
    <section className={cn("bg-muted/50 py-12 lg:py-16", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          <UniformText
            parameterId="title"
            placeholder={title}
            as="span"
          />
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          <UniformText
            parameterId="description"
            placeholder={description}
            as="span"
          />
        </p>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "productHero",
  component: ProductHero,
});

export default ProductHero;

