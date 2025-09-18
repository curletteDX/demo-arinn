import React from "react";
import {
  UniformText,
  UniformRichText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import Image from "next/image";
import { imageFrom } from "@uniformdev/assets";
import type { AssetParamValue } from "@uniformdev/assets";
import { Globe, Twitter, Linkedin } from "lucide-react";
import { resolveRichTextRenderer } from "../../lib/richTextRenderers";

export interface ArticleAuthorProps {
  className?: string;
  avatar?: AssetParamValue;
  twitterUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  sectionTitle?: string;
}

/**
 * ArticleAuthor Component
 * 
 * Displays author information including avatar, name, bio, and social links.
 * This component creates a professional author section typically placed
 * at the end of articles or in sidebars.
 * 
 * Features:
 * - Author avatar display
 * - Editable name and bio
 * - Social media links (Twitter, LinkedIn, Website)
 * - Clean, card-like design
 * - Responsive layout
 * 
 * Uniform Integration:
 * - Uses AssetParamValue for author avatar with imageFrom transformations
 * - Uses UniformText for author name
 * - Uses UniformRichText for author bio
 * - Supports link parameters for social profiles
 */
export const ArticleAuthor: React.FC<ArticleAuthorProps> = ({
  className = "",
  avatar,
  twitterUrl,
  linkedinUrl,
  websiteUrl,
}) => {
  // Process the Uniform avatar asset parameter
  const avatarAssets = avatar ?? [];
  const [firstAsset] = avatarAssets;
  
  // Generate optimized avatar URL
  const avatarUrl = firstAsset
    ? imageFrom(firstAsset)
        .transform({ 
          width: 160,    // 2x the display size for crisp display
          height: 160,   // Square aspect ratio for avatars
          fit: "cover",   // Smart crop to maintain aspect ratio
          focal: firstAsset.fields?.focalPoint?.value || "center" // Focal point support for precise positioning
        })
        .url()
    : undefined;

  // Extract alt text for accessibility
  const avatarAlt = firstAsset?.fields?.description?.value || 
                   firstAsset?.fields?.title?.value || 
                   'Author avatar';

  return (
    <div className={`max-w-4xl mx-auto px-4 py-8 ${className}`}>
      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold mb-4">
          <UniformText
            parameterId="sectionTitle"
            placeholder="About the Author"
          />
        </h3>
        <div className="flex gap-4">
          {/* Author Avatar */}
          <div className="flex-shrink-0">
            {avatarUrl ? (
              // ACTUAL AVATAR: Optimized and properly sized
              <div className="relative w-20 h-20 overflow-hidden rounded-full bg-gray-100">
                <Image
                  src={avatarUrl}
                  alt={avatarAlt}
                  fill
                  className="object-cover"
                  sizes="80px" // Exact size for optimization
                />
              </div>
            ) : (
              // PLACEHOLDER: Shown when no avatar is selected
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Author Info */}
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-2">
              <UniformText
                parameterId="name"
                placeholder="Author name goes here"
              />
            </h4>
            
            {/* Author Bio */}
            <div className="text-gray-600 mb-3 prose prose-sm">
              <UniformRichText
                parameterId="bio"
                placeholder="Author bio goes here..."
                resolveRichTextRenderer={resolveRichTextRenderer}
              />
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  title="Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                  title="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Register with Uniform
registerUniformComponent({
  type: "articleAuthor",
  component: ArticleAuthor,
});

export default ArticleAuthor;
