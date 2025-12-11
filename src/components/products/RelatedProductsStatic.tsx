import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products-data";

export interface RelatedProductsStaticProps {
  className?: string;
  /** Array of related products */
  products: Product[];
  /** Section title */
  title?: string;
  /** View all link text */
  viewAllText?: string;
  /** View all link href */
  viewAllHref?: string;
}

/**
 * RelatedProductsStatic - Product recommendation section
 *
 * A standalone section for displaying related products without Uniform.
 * Matches the screenshot design with "You May Also Like" styling.
 *
 * Features:
 * - Section title with view all link
 * - 2-column grid on mobile, 4-column on desktop
 * - Product cards with image, name, and price
 * - Hover effects with image scale
 * - Warm, furniture e-commerce styling
 */
export const RelatedProductsStatic: React.FC<RelatedProductsStaticProps> = ({
  className = "",
  products,
  title = "You May Also Like",
  viewAllText = "View All",
  viewAllHref = "/products",
}) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-16 lg:py-24 bg-[#FAF9F7]", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {title}
          </h2>
          <Link
            href={viewAllHref}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            {viewAllText}
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#F0EDE8] mb-4">
                <NextImage
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Badge */}
                {product.badge && (
                  <div
                    className={cn(
                      "absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium",
                      product.badge === "Sale"
                        ? "bg-red-600 text-white"
                        : product.badge === "New"
                          ? "bg-[#8B7355] text-white"
                          : "bg-amber-100 text-amber-800"
                    )}
                  >
                    {product.badge}
                  </div>
                )}
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-1 group-hover:text-[#8B7355] transition-colors">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-semibold text-gray-900">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProductsStatic;
