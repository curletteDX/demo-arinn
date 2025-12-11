"use client";

import { useState } from "react";
import { Star, Heart, Truck, RotateCcw, Shield, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products-data";

export interface ProductInfoStaticProps {
  className?: string;
  product: Product;
}

/**
 * ProductInfoStatic - Static product information component
 *
 * A standalone version of ProductInfo that works with the Product data type.
 * Matches the screenshot design with warm furniture e-commerce styling.
 *
 * Features:
 * - Product name, price, and optional sale price
 * - Star rating with review count
 * - Promotional badge (Sale, New, Best Seller)
 * - Color and material selection buttons
 * - Quantity selector with add to cart
 * - Wishlist button
 * - Feature highlights (shipping, warranty, returns)
 * - Expandable accordion sections
 */
export const ProductInfoStatic: React.FC<ProductInfoStaticProps> = ({
  className = "",
  product,
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Format prices
  const formattedPrice = product.price.toLocaleString();
  const formattedOriginalPrice = product.originalPrice?.toLocaleString();

  return (
    <div className={cn("space-y-6", className)}>
      {/* Badge */}
      {product.badge && (
        <Badge
          className={cn(
            "text-sm font-medium px-3 py-1",
            product.badge === "Sale"
              ? "bg-red-600 text-white hover:bg-red-600"
              : product.badge === "New"
                ? "bg-[#8B7355] text-white hover:bg-[#8B7355]"
                : "bg-amber-100 text-amber-800 hover:bg-amber-100"
          )}
        >
          {product.badge}
        </Badge>
      )}

      {/* Title */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          {product.name}
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-gray-900">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviewCount} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-gray-900">
          ${formattedPrice}
        </span>
        {formattedOriginalPrice && (
          <span className="text-xl text-gray-400 line-through">
            ${formattedOriginalPrice}
          </span>
        )}
      </div>

      <Separator className="bg-gray-200" />

      {/* Description */}
      <p className="text-base text-gray-600 leading-relaxed">
        {product.description}
      </p>

      {/* Color selection */}
      {product.colors.length > 0 && (
        <div>
          <label className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3 block">
            Color: <span className="uppercase">{selectedColor}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "px-4 py-2.5 rounded-lg border text-sm font-medium transition-all",
                  selectedColor === color
                    ? "border-[#8B7355] bg-[#8B7355]/5 text-gray-900"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                )}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Material selection */}
      {product.materials.length > 0 && (
        <div>
          <label className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3 block">
            Material: <span className="uppercase">{selectedMaterial}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {product.materials.map((material) => (
              <button
                key={material}
                onClick={() => setSelectedMaterial(material)}
                className={cn(
                  "px-4 py-2.5 rounded-lg border text-sm font-medium transition-all",
                  selectedMaterial === material
                    ? "border-[#8B7355] bg-[#8B7355]/5 text-gray-900"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                )}
              >
                {material}
              </button>
            ))}
          </div>
        </div>
      )}

      <Separator className="bg-gray-200" />

      {/* Quantity and actions */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3 block">
            Quantity
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-200 rounded-lg bg-white">
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 hover:bg-gray-50"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </Button>
              <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 hover:bg-gray-50"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
            <span className="text-sm text-gray-500">
              {product.inStock ? "In stock and ready to ship" : "Out of stock"}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            size="lg"
            className="flex-1 h-12 bg-[#8B7355] hover:bg-[#7A6548] text-white font-medium text-base"
            disabled={!product.inStock}
          >
            Add to Cart - ${(product.price * quantity).toLocaleString()}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "h-12 w-12 border-gray-200",
              isWishlisted && "bg-red-50 border-red-200"
            )}
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart
              className={cn(
                "h-5 w-5",
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
              )}
            />
          </Button>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="grid sm:grid-cols-3 gap-4 p-5 bg-[#F0EDE8] rounded-xl">
        <div className="flex items-start gap-3">
          <Truck className="h-5 w-5 text-gray-700 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
            <p className="text-xs text-gray-500">On orders over $999</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <RotateCcw className="h-5 w-5 text-gray-700 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-900">100-Day Trial</p>
            <p className="text-xs text-gray-500">Risk-free returns</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-gray-700 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Lifetime Warranty</p>
            <p className="text-xs text-gray-500">On frame & springs</p>
          </div>
        </div>
      </div>

      {/* Accordions */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="details" className="border-gray-200">
          <AccordionTrigger className="text-base font-medium text-gray-900 hover:no-underline">
            Product Details
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                Handcrafted with premium materials and built to last. Each piece
                is made to order by skilled artisans.
              </p>
              {product.dimensions && (
                <p>
                  <strong className="text-gray-900">Dimensions:</strong> {product.dimensions}
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="care" className="border-gray-200">
          <AccordionTrigger className="text-base font-medium text-gray-900 hover:no-underline">
            Care Instructions
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-gray-600">{product.care}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping" className="border-gray-200">
          <AccordionTrigger className="text-base font-medium text-gray-900 hover:no-underline">
            Shipping & Delivery
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-gray-600">{product.shipping}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductInfoStatic;
