import React from "react";
// Uniform imports for creating editable components
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { Card as UICard, CardContent } from "../ui/card"; // Reusable UI components

export interface CardProps {
  className?: string;
}

/**
 * Card Component
 * 
 * A basic content card that displays a title and rich text content.
 * This component is perfect for showcasing features, services, or any 
 * content that needs to be presented in a clean, contained format.
 * 
 * Features:
 * - Editable title (UniformText)
 * - Rich text content with formatting (UniformRichText)
 * - CTA slot for action buttons or links
 * - Consistent card styling with shadow/border
 * - Responsive design
 * - Full height layout (h-full) for grid alignment
 * 
 * Common Use Cases:
 * - Feature highlights
 * - Service descriptions  
 * - Team member bios
 * - Product summaries
 * - Blog post previews
 * 
 * Best used inside CardGrid component or other layout components.
 */
export const Card: React.FC<CardProps> = ({
  className = "",
}) => {
  return (
    <UICard className={`h-full ${className}`}> {/* h-full ensures equal height in grids */}
      <CardContent className="p-6">
        {/* CARD TITLE: Editable text field for the card headline */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          <UniformText
            placeholder="Card title goes here"
            parameterId="title"
            as="span" // Renders as span inside h3 for proper semantics
          />
        </h3>
        
        {/* CARD CONTENT: Rich text editor for formatted content */}
        <div className="text-gray-600 leading-relaxed mb-6">
          <UniformText
            placeholder="Card content goes here"
            parameterId="content"
            as="p"
          />
        </div>

        {/* CTA SLOT: Area where content authors can add call-to-action buttons */}
        <div className="mt-auto">
          <UniformSlot name="cta" />
        </div>
      </CardContent>
    </UICard>
  );
};

// UNIFORM REGISTRATION: Makes this component available in CardGrid slots
// and other components that allow card-type components
registerUniformComponent({
  type: "card",
  component: Card,
});

export default Card;
