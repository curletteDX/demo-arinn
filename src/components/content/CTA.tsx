import React from 'react';
// Uniform imports for creating editable components
import { UniformText, registerUniformComponent } from '@uniformdev/canvas-react';
import { Button } from "../ui/button"; // Reusable UI button component
import Link from "next/link"; // Next.js optimized linking
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CTAProps {
  className?: string;
  link?: {
    path?: string; // URL destination for the button
  };
  style?: string; // Visual style variant
  /** Context for styling - 'ctaBanner' applies white bg/outline styles */
  context?: string;
  /** Whether this is the primary button (for CtaBanner context) */
  isPrimary?: boolean;
  /** Show arrow icon (typically for primary buttons) */
  showArrow?: boolean;
}

/**
 * CTA (Call-to-Action) Component
 *
 * A simple but essential component for driving user actions.
 * This component creates clickable buttons that can link to other pages.
 *
 * Features:
 * - Editable button text (UniformText)
 * - Configurable link destination
 * - Multiple visual styles (primary/secondary)
 * - Responsive design
 * - Next.js optimized navigation
 *
 * Common Use Cases:
 * - "Learn More" buttons
 * - "Contact Us" links
 * - "Get Started" actions
 * - Navigation between pages
 *
 * This component is often used inside UniformSlots in other components
 * like Section, Hero, etc.
 */
export const CTA: React.FC<CTAProps> = ({
  className = '',
  link,
  style = 'primary', // Default to primary button styling
  context,
  isPrimary = false,
  showArrow = false,
}) => {
  // Use provided link or fallback to placeholder
  const href = link?.path || "#";

  // Determine button styling based on context and style prop
  let buttonVariant: "default" | "outline" | "ghost" = style === 'secondary' ? 'outline' : 'default';
  let buttonClassName = "px-8 py-3";

  // Apply CtaBanner-specific styling
  if (context === 'ctaBanner') {
    if (isPrimary) {
      // Primary button: white background
      buttonClassName = cn("px-8 py-3 bg-white text-foreground hover:bg-white/90");
      buttonVariant = "default";
      showArrow = true; // Always show arrow for primary in CtaBanner
    } else {
      // Secondary button: white outline
      buttonClassName = cn("px-8 py-3 border-white text-white hover:bg-white/10 bg-transparent");
      buttonVariant = "outline";
    }
  }

  return (
    <Link href={href} className={className}>
      <Button
        size="lg"
        variant={buttonVariant}
        className={buttonClassName}
      >
        {/* UNIFORM TEXT: Editable button text */}
        <UniformText
          placeholder="Button text goes here" // Shown when empty
          parameterId="text" // Content field ID
          as="span" // Render as span inside button
        />
        {showArrow && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </Link>
  );
};

// UNIFORM REGISTRATION: Makes this component available for content authors
// They can add CTA components to any UniformSlot that allows them
registerUniformComponent({
  type: "cta",
  component: CTA,
});

export default CTA;
