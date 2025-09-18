import React from "react";
// Uniform imports for creating image-based feature cards
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { Card, CardContent } from "../ui/card"; // Consistent card styling
import Image from "next/image"; // Next.js optimized images
import { imageFrom } from "@uniformdev/assets"; // Uniform asset processing
import type { AssetParamValue } from "@uniformdev/assets";

export interface ImageFeatureProps {
  className?: string;
  image?: AssetParamValue; // Uniform asset parameter
}

/**
 * Image Feature Component - Feature Card with Icon/Image
 * 
 * This component creates a feature card that combines a small image/icon
 * with text content. It's perfect for showcasing services, features, or
 * benefits in a visually appealing card format.
 * 
 * Features:
 * - Small icon/image display (96x96px)
 * - Editable title and rich text description
 * - CTA slot for action buttons or links
 * - Consistent card styling with Card
 * - Centered layout for visual appeal
 * - Uniform asset integration
 * - Responsive design
 * 
 * Design Pattern:
 * - Icon at top (centered)
 * - Title below icon
 * - Description at bottom
 * - All content centered
 * 
 * Common Use Cases:
 * - Service features (with service icons)
 * - Product benefits (with benefit icons)
 * - Team members (with profile photos)
 * - Process steps (with step icons)
 * - Technology stack (with tech logos)
 * 
 * Best used inside CardGrid component for organized layouts.
 */
export const ImageFeature: React.FC<ImageFeatureProps> = ({
  className = "",
  image,
}) => {
  // Process the Uniform asset parameter
  const imageAssets = image ?? [];
  const [firstAsset] = imageAssets;
  
  // Generate optimized image URL for small icon display
  const imageUrl = firstAsset
    ? imageFrom(firstAsset)
        .transform({ 
          width: 600,    // Higher resolution for crisp display
          height: 400,   // Maintain aspect ratio
          fit: "cover",   // Smart crop
          focal: firstAsset.fields?.focalPoint?.value || "center" // Focal point support for precise positioning
        })
        .url()
    : undefined;

  // Extract alt text for accessibility
  const imageAlt = firstAsset?.fields?.description?.value || 
                  firstAsset?.fields?.title?.value || 
                  'Feature image';

  return (
    <Card className={`h-full ${className}`}> {/* h-full for equal height in grids */}
      <CardContent className="p-6 text-center">
        {/* FEATURE IMAGE/ICON: Small centered image */}
        <div className="mb-6">
          {imageUrl ? (
            // ACTUAL IMAGE: Optimized and properly sized
            <div className="relative w-24 h-24 mx-auto overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="96px" // Exact size for optimization
              />
            </div>
          ) : (
            // PLACEHOLDER: Shown when no image is selected
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* FEATURE TITLE: Editable headline */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          <UniformText
            placeholder="Feature title goes here"
            parameterId="title"
            as="span"
          />
        </h3>

        {/* FEATURE DESCRIPTION: Rich text content */}
        <div className="text-gray-600 leading-relaxed mb-6">
          <UniformText
            placeholder="Feature description goes here"
            parameterId="description"
            as="p"
          />
        </div>

        {/* CTA SLOT: Area where content authors can add call-to-action buttons */}
        <div className="mt-auto">
          <UniformSlot name="cta" />
        </div>
      </CardContent>
    </Card>
  );
};

// UNIFORM REGISTRATION: Makes this component available in card slots
// Perfect for feature grids, service showcases, or any icon-based content
registerUniformComponent({
  type: "imageFeature",
  component: ImageFeature,
});

export default ImageFeature;
