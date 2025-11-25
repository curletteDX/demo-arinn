import React from "react";
import { Star } from "lucide-react";
import {
  UniformText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  className?: string;
  /** Testimonial quote */
  quote?: string;
  /** Author name */
  author?: string;
  /** Author location */
  location?: string;
  /** Product name */
  product?: string;
  /** Star rating (1-5) */
  rating?: number;
}

/**
 * TestimonialCard - Individual customer testimonial card
 *
 * A card component displaying a customer review with star rating,
 * quote, author information, and product reference.
 *
 * Features:
 * - Star rating display (1-5 stars)
 * - Customer quote/testimonial
 * - Author name and location
 * - Product reference
 * - Clean white card design with shadow
 * - All text editable via Uniform
 *
 * Design Notes:
 * - Uses warm amber/brown accent color for stars
 * - Serif font for elegant feel
 * - Generous padding for readability
 */
export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  className = "",
  rating = 5,
}) => {
  // Ensure rating is between 1 and 5
  const safeRating = Math.max(1, Math.min(5, rating || 5));

  return (
    <div className={cn("bg-card rounded-xl p-8 relative shadow-sm", className)}>
      {/* Star Rating */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(safeRating)].map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-primary text-primary"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
        <UniformText
          parameterId="quote"
          placeholder="We spent 3 months searching for the perfect sofa. The Lewis sectional was worth every day of the wait—it's been 2 years and it still looks brand new."
          as="span"
        />
      </blockquote>

      {/* Author Info */}
      <div>
        <p className="font-semibold text-foreground">
          <UniformText
            parameterId="author"
            placeholder="Sarah & Michael T."
            as="span"
          />
        </p>
        <p className="text-sm text-muted-foreground">
          <UniformText
            parameterId="location"
            placeholder="Portland, OR"
            as="span"
          />
        </p>
        <p className="text-sm text-primary mt-1">
          <UniformText
            parameterId="product"
            placeholder="Lewis Sectional in Moss Velvet"
            as="span"
          />
        </p>
      </div>
    </div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "testimonialCard",
  component: TestimonialCard,
});

export default TestimonialCard;

