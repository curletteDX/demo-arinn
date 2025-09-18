import React from "react";
import { UniformText, registerUniformComponent } from "@uniformdev/canvas-react";
import { Badge } from "../ui/badge";
import { Tag } from "lucide-react";

export interface ArticleTagsProps {
  className?: string;
  tags?: string[];
  tagsLabel?: string;
}

/**
 * ArticleTags Component
 * 
 * Displays article tags in a clean, organized format with an icon.
 * This component shows the tags associated with an article to help
 * with categorization and discovery.
 * 
 * Features:
 * - Responsive tag layout
 * - Icon indicator
 * - Styled badges for each tag
 * - Graceful handling of empty state
 * 
 * Uniform Integration:
 * - Receives tags as a multi-select parameter
 * - Automatically hides when no tags are present
 */
export const ArticleTags: React.FC<ArticleTagsProps> = ({
  className = "",
  tags = [],
}) => {
  // Don't render if no tags
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          <UniformText
            parameterId="tagsLabel"
            placeholder="Tags:"
          />
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

// Register with Uniform
registerUniformComponent({
  type: "articleTags",
  component: ArticleTags,
});

export default ArticleTags;
