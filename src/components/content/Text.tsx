import React from "react";
// Uniform imports for simple text editing
import {
  UniformText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";

export interface TextProps {
  className?: string;
}

/**
 * Text Component - Plain Text Content
 * 
 * This component provides a clean, simple text editor for content authors.
 * Unlike RichText (which supports formatting), this component handles plain
 * text content without any styling options.
 * 
 * Features:
 * - Single text input field
 * - Clean typography with good readability
 * - Responsive layout
 * - Centered content presentation
 * - No formatting complexity
 * 
 * When to Use:
 * - Simple announcements
 * - Brief descriptions
 * - Quotes or testimonials (without formatting)
 * - Any content that should be plain text
 * - When you want to avoid formatting complexity
 * 
 * For content that needs formatting (bold, links, lists), use RichText instead.
 * 
 * This component is perfect for content authors who want simplicity
 * without the distraction of formatting options.
 */
export const Text: React.FC<TextProps> = ({
  className = "",
}) => {
  return (
    <section className={`py-12 px-6 ${className}`}>
      {/* Centered container with optimal reading width */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-gray-600 leading-relaxed text-lg">
          {/* UNIFORM TEXT: Simple text input without formatting */}
          <UniformText
            placeholder="Simple text content goes here"
            parameterId="content"
            as="p" // Renders as paragraph element
          />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION: Makes this component available for simple text content
// Perfect for announcements, simple descriptions, or any plain text needs
registerUniformComponent({
  type: "text",
  component: Text,
});

export default Text;
