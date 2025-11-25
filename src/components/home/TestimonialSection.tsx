import React from "react";
import { Star } from "lucide-react";
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";

export interface TestimonialSectionProps {
  className?: string;
  /** Average rating (e.g., 4.9) */
  averageRating?: string;
  /** Total number of reviews */
  reviewCount?: string;
  /** Section title */
  title?: string;
}

/**
 * TestimonialSection - Customer testimonials showcase section
 *
 * A section component displaying customer reviews and testimonials
 * with an overall rating display and grid of testimonial cards.
 *
 * Features:
 * - Overall rating display with stars
 * - Review count and average rating
 * - Section title
 * - Responsive grid layout (1 col mobile, 3 cols desktop)
 * - Warm background color
 * - Slot for adding TestimonialCard components
 * - All text editable via Uniform
 *
 * Design Notes:
 * - Uses warm amber/brown accent color
 * - Serif font for section title
 * - Light background tint for visual separation
 *
 * Slot:
 * - `testimonials`: Add TestimonialCard components here
 */
export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  className = "",
}) => {
  return (
    <section className={cn("py-16 lg:py-24 bg-primary/10", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Star Rating */}
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-primary text-primary"
              />
            ))}
          </div>

          {/* Rating Text */}
          <p className="text-sm font-medium text-primary mb-2">
            <UniformText
              parameterId="averageRating"
              placeholder="4.9"
              as="span"
            />
            {" out of 5 based on "}
            <UniformText
              parameterId="reviewCount"
              placeholder="12,847"
              as="span"
            />
            {" reviews"}
          </p>

          {/* Title */}
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            <UniformText
              parameterId="title"
              placeholder="Loved by Thousands of Happy Homes"
              as="span"
            />
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <UniformSlot name="testimonials" />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "testimonialSection",
  component: TestimonialSection,
});

export default TestimonialSection;

