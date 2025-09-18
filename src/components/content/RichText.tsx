import React from "react";
// Uniform imports for rich text editing
import {
  UniformRichText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { resolveRichTextRenderer } from "../../lib/richTextRenderers";

export interface RichTextProps {
  className?: string;
}

/**
 * Rich Text Component - Advanced Text Editor
 * 
 * This component provides a full-featured rich text editor for content authors.
 * Unlike text (which only handles plain text), this component supports
 * formatted text with styling, links, lists, and more.
 * 
 * Features:
 * - Full rich text editing (bold, italic, links, lists, etc.)
 * - Custom rendering for different text elements
 * - Responsive layout with optimal reading width
 * - Clean, accessible typography
 * 
 * Rich Text Capabilities:
 * - Text formatting (bold, italic, underline)
 * - Headings (H1-H6)
 * - Lists (bulleted, numbered)
 * - Links (internal and external)
 * - Blockquotes
 * - Code snippets
 * 
 * When to Use:
 * - Blog content
 * - Long-form articles
 * - Policy pages
 * - Any content that needs formatting
 * 
 * For simple text without formatting, use text instead.
 */
export const RichText: React.FC<RichTextProps> = ({
  className = "",
}) => {
  return (
    <section className={`py-12 px-6 ${className}`}>
      {/* Optimal reading width for text content */}
      <div className="max-w-4xl mx-auto">
        <div className="text-gray-600 leading-relaxed">
          {/* UNIFORM RICH TEXT: Full rich text editor with formatting */}
          <UniformRichText
            placeholder="Rich text content goes here"
            parameterId="content"
            resolveRichTextRenderer={resolveRichTextRenderer} // Handles custom rendering
          />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION: Makes this component available for rich content
// Perfect for blog posts, articles, documentation, or any formatted text
registerUniformComponent({
  type: "richText",
  component: RichText,
});

export default RichText;
