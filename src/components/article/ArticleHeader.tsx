import React from "react";
import {
  UniformText,
  UniformRichText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import Image from "next/image";
import { imageFrom } from "@uniformdev/assets";
import type { AssetParamValue } from "@uniformdev/assets";
import { Badge } from "../ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { resolveRichTextRenderer } from "../../lib/richTextRenderers";

export interface ArticleHeaderProps {
  className?: string;
  category?: string;
  publishedDate?: string;
  readingTime?: string;
  authorName?: string;
  byText?: string;
  minReadText?: string;
  featuredImage?: AssetParamValue;
}

/**
 * ArticleHeader Component
 * 
 * Displays the main header section of an article including title, excerpt,
 * category badge, metadata, and an optional featured image.
 * This component is designed to be the top section of article detail pages.
 * 
 * Features:
 * - Editable title and excerpt (Uniform fields)
 * - Optional featured image with optimized display
 * - Category badge with color coding
 * - Article metadata display (date, reading time, author)
 * - Editable text labels ("By", "min read")
 * - Clean, professional typography
 * - Responsive design with proper image aspect ratios
 * 
 * Image Features:
 * - 2:1 aspect ratio (1200x600) optimized for article headers
 * - Smart cropping with "cover" fit
 * - Responsive image loading with proper sizes
 * - Fallback placeholder when no image selected
 * - Accessibility with proper alt text extraction
 * 
 * Uniform Integration:
 * - Uses UniformText for the article title and editable labels
 * - Uses UniformRichText for the article excerpt
 * - Uses AssetParamValue for featured image with imageFrom transformations
 * - Supports category, date, reading time, and author parameters
 */
export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  className = "",
  category,
  publishedDate,
  readingTime,
  authorName,
  featuredImage,
}) => {
  const categoryColors: Record<string, string> = {
    technology: 'bg-blue-100 text-blue-800',
    design: 'bg-purple-100 text-purple-800',
    business: 'bg-green-100 text-green-800',
    marketing: 'bg-orange-100 text-orange-800',
    development: 'bg-indigo-100 text-indigo-800',
    lifestyle: 'bg-pink-100 text-pink-800',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Process the Uniform featured image asset parameter
  const imageAssets = featuredImage ?? [];
  const [firstAsset] = imageAssets;
  
  // Generate optimized image URL for featured image
  const imageUrl = firstAsset
    ? imageFrom(firstAsset)
        .transform({ 
          width: 1200,   // High resolution for featured images
          height: 600,   // 2:1 aspect ratio
          fit: "cover",   // Smart crop to maintain aspect ratio
          focal: firstAsset.fields?.focalPoint?.value || "center" // Focal point support for precise positioning
        })
        .url()
    : undefined;

  // Extract alt text for accessibility
  const imageAlt = firstAsset?.fields?.description?.value || 
                  firstAsset?.fields?.title?.value || 
                  'Article featured image';

  return (
    <header className={`max-w-4xl mx-auto px-4 py-8 ${className}`}>
      {/* Category Badge */}
      {category && (
        <div className="mb-4">
          <Badge 
            variant="secondary" 
            className={`${categoryColors[category] || 'bg-gray-100 text-gray-800'} capitalize`}
          >
            {category}
          </Badge>
        </div>
      )}

      {/* Article Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
        <UniformText 
          parameterId="title" 
          placeholder="Article title goes here" 
        />
      </h1>

      {/* Article Excerpt */}
      <div className="text-xl text-gray-600 mb-6 leading-relaxed">
        <UniformRichText 
          parameterId="excerpt" 
          placeholder="Article excerpt goes here..."
          resolveRichTextRenderer={resolveRichTextRenderer}
        />
      </div>

      {/* Article Metadata */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        {publishedDate && (
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(publishedDate)}</span>
          </div>
        )}
        
        {readingTime && (
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>
              {readingTime}
            </span>
          </div>
        )}

        {authorName && (
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>
              <UniformText
                parameterId="byText"
                placeholder="By"
                as="span"
              />{' '}
              {authorName}
            </span>
          </div>
        )}
      </div>

      {/* Featured Image */}
      {imageUrl && (
        <div className="mt-8 mb-0 rounded-lg overflow-hidden">
          <div className="relative aspect-[2/1] bg-gray-100">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        </div>
      )}

      {/* Image Placeholder when no image selected */}
      {!imageUrl && (
        <div className="mt-8 mb-0 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
          <div className="aspect-[2/1] flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm">Select featured image in the panel →</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Register with Uniform
registerUniformComponent({
  type: "articleHeader",
  component: ArticleHeader,
});

export default ArticleHeader;
