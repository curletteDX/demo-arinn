"use client";

import { useState } from "react";
import {
  UniformText,
  UniformRichText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
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
import { resolveRichTextRenderer } from "@/lib/richTextRenderers";

export interface ProductInfoProps {
  className?: string;
  /** Product name/title */
  name?: string;
  /** Product price */
  price?: number;
  /** Original price (for showing discounts) */
  originalPrice?: number;
  /** Product rating (1-5) */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Badge text (e.g., "Sale", "New", "Best Seller") */
  badge?: string;
  /** Product description (rich text) */
  description?: string;
  /** Available colors (comma-separated) */
  colors?: string;
  /** Available materials (comma-separated) */
  materials?: string;
  /** Product dimensions */
  dimensions?: string;
  /** Care instructions (rich text) */
  care?: string;
  /** Shipping information (rich text) */
  shipping?: string;
}

/**
 * ProductInfo - Detailed product information component
 *
 * A comprehensive product details component for product detail pages (PDP).
 * Displays all essential product information with interactive elements.
 *
 * Features:
 * - Product name, price, and optional sale price
 * - Star rating with review count
 * - Promotional badge (Sale, New, Best Seller)
 * - Color and material selection
 * - Quantity selector with add to cart
 * - Wishlist button
 * - Feature highlights (shipping, warranty, returns)
 * - Expandable accordion sections for details, care, and shipping
 * - All text content editable via Uniform
 *
 * Use Cases:
 * - Product detail pages
 * - Quick view modals
 * - Featured product spotlights
 *
 * Design Notes:
 * - Uses warm furniture e-commerce theme
 * - Responsive layout
 * - Interactive color/material selectors
 * - Collapsible accordion for additional details
 */
export const ProductInfo: React.FC<ProductInfoProps> = ({
  className = "",
  price = 1299,
  originalPrice,
  rating = 4.8,
  reviewCount = 124,
  badge,
  colors = "Natural Oak,Walnut,Ebony",
  materials = "Premium Leather,Linen,Velvet",
  dimensions,
}) => {
  // Parse colors and materials from comma-separated strings
  const colorOptions = colors
    ? colors.split(",").map((c) => c.trim()).filter(Boolean)
    : ["Natural Oak"];
  const materialOptions = materials
    ? materials.split(",").map((m) => m.trim()).filter(Boolean)
    : ["Premium Leather"];

  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(materialOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Format prices
  const formattedPrice = price?.toLocaleString() ?? "0";
  const formattedOriginalPrice = originalPrice?.toLocaleString();

  return (
    <div className={cn("space-y-6", className)}>
      {/* Badge */}
      {badge && (
        <Badge
          className={cn(
            badge === "Sale"
              ? "bg-destructive text-destructive-foreground"
              : badge === "New"
                ? "bg-primary text-primary-foreground"
                : "bg-accent text-accent-foreground"
          )}
        >
          {badge}
        </Badge>
      )}

      {/* Title */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
          <UniformText
            parameterId="name"
            placeholder="Product Name"
            as="span"
          />
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviewCount} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-foreground">
          ${formattedPrice}
        </span>
        {formattedOriginalPrice && (
          <span className="text-xl text-muted-foreground line-through">
            ${formattedOriginalPrice}
          </span>
        )}
      </div>

      <Separator />

      {/* Description */}
      <div className="text-base text-muted-foreground leading-relaxed prose prose-sm max-w-none">
        <UniformRichText
          parameterId="description"
          placeholder="Add a detailed product description..."
          resolveRichTextRenderer={resolveRichTextRenderer}
        />
      </div>

      {/* Color selection */}
      {colorOptions.length > 0 && (
        <div>
          <label className="text-sm font-semibold uppercase tracking-wider mb-3 block">
            Color: {selectedColor}
          </label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "px-4 py-2 rounded-md border transition-all",
                  selectedColor === color
                    ? "border-foreground bg-foreground/10 text-foreground font-medium"
                    : "border-border bg-background text-muted-foreground hover:border-foreground/50"
                )}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Material selection */}
      {materialOptions.length > 0 && (
        <div>
          <label className="text-sm font-semibold uppercase tracking-wider mb-3 block">
            Material: {selectedMaterial}
          </label>
          <div className="flex flex-wrap gap-2">
            {materialOptions.map((material) => (
              <button
                key={material}
                onClick={() => setSelectedMaterial(material)}
                className={cn(
                  "px-4 py-2 rounded-md border transition-all",
                  selectedMaterial === material
                    ? "border-foreground bg-foreground/10 text-foreground font-medium"
                    : "border-border bg-background text-muted-foreground hover:border-foreground/50"
                )}
              >
                {material}
              </button>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Quantity and actions */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold uppercase tracking-wider mb-3 block">
            Quantity
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
              In stock and ready to ship
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button size="lg" className="flex-1">
            Add to Cart - ${(price * quantity).toLocaleString()}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={isWishlisted ? "bg-accent/10" : ""}
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart
              className={cn(
                "h-5 w-5",
                isWishlisted && "fill-destructive text-destructive"
              )}
            />
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid sm:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start gap-3">
          <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Free Shipping</p>
            <p className="text-xs text-muted-foreground">On orders over $999</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <RotateCcw className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">100-Day Trial</p>
            <p className="text-xs text-muted-foreground">Risk-free returns</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Lifetime Warranty</p>
            <p className="text-xs text-muted-foreground">On frame & springs</p>
          </div>
        </div>
      </div>

      {/* Accordions */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="details">
          <AccordionTrigger>Product Details</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Handcrafted with premium materials and built to last. Each piece
                is made to order by skilled artisans.
              </p>
              {dimensions && (
                <p>
                  <strong>Dimensions:</strong> {dimensions}
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="care">
          <AccordionTrigger>Care Instructions</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <UniformText
                  parameterId="care"
                  placeholder="Add care instructions..."
                  as="span"
                />
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping">
          <AccordionTrigger>Shipping & Delivery</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <UniformText
                  parameterId="shipping"
                  placeholder="Add shipping information..."
                  as="span"
                />
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "productInfo",
  component: ProductInfo,
});

export default ProductInfo;

