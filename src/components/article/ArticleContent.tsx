import React from "react";
import {
  UniformRichText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { resolveRichTextRenderer } from "../../lib/richTextRenderers";

export interface ArticleContentProps {
  className?: string;
}

/**
 * ArticleContent Component
 * 
 * Displays the main body content of an article with proper typography
 * and rich text formatting. This component focuses solely on presenting
 * the article's main content in a readable format.
 * 
 * Features:
 * - Rich text content with full formatting support
 * - Optimized typography for reading (prose classes)
 * - Responsive design
 * - Clean, minimal styling
 * 
 * Uniform Integration:
 * - Uses UniformRichText for the main article content
 * - Supports all rich text formatting options
 * - Integrates with custom rich text renderers
 */
export const ArticleContent: React.FC<ArticleContentProps> = ({
  className = "",
}) => {
  return (
    <div className={`max-w-4xl mx-auto px-4 py-8 ${className}`}>
      <div className="prose prose-lg max-w-none">
        <UniformRichText 
          parameterId="content" 
          placeholder="Article content goes here..."
          resolveRichTextRenderer={resolveRichTextRenderer}
        />
      </div>
    </div>
  );
};

// Register with Uniform
registerUniformComponent({
  type: "articleContent",
  component: ArticleContent,
});

export default ArticleContent;
