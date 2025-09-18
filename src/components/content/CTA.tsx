import React from 'react';
// Uniform imports for creating editable components
import { UniformText, registerUniformComponent } from '@uniformdev/canvas-react';
import { Button } from "../ui/button"; // Reusable UI button component
import Link from "next/link"; // Next.js optimized linking

export interface CTAProps {
  className?: string;
  link?: {
    path?: string; // URL destination for the button
  };
  style?: string; // Visual style variant
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
  style = 'primary' // Default to primary button styling
}) => {
  // Use provided link or fallback to placeholder
  const href = link?.path || "#";
  
  return (
    <Link href={href} className={className}>
      <Button
        size="lg"
        variant={style === 'secondary' ? 'outline' : 'default'} // Style based on prop
        className="px-8 py-3"
      >
        {/* UNIFORM TEXT: Editable button text */}
        <UniformText
          placeholder="Button text goes here" // Shown when empty
          parameterId="text" // Content field ID
          as="span" // Render as span inside button
        />
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
