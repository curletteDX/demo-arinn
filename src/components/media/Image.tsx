import React from "react";
// Uniform imports for image handling
import {
  UniformText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import NextImage from "next/image"; // Next.js optimized images
import { imageFrom } from "@uniformdev/assets"; // Uniform asset processing
import type { AssetParamValue } from "@uniformdev/assets";

export interface ImageProps {
  className?: string;
  image?: AssetParamValue; // Uniform asset parameter
}

/**
 * Image Component - Standalone Image Display
 * 
 * This component displays a single image with title and caption.
 * It demonstrates how to work with Uniform's asset management system
 * and provides a clean way to showcase images with context.
 * 
 * Features:
 * - Uniform asset integration (drag & drop image selection)
 * - Automatic image optimization via Next.js
 * - Image transformations (resize, crop, format conversion)
 * - Responsive design with proper aspect ratios
 * - Editable title and caption
 * - Fallback placeholder when no image selected
 * - Accessibility features (alt text, proper semantics)
 * 
 * Image Processing:
 * - Automatic resizing (800x600 optimized)
 * - Smart cropping with "cover" fit
 * - Format optimization (WebP when supported)
 * - Responsive loading with proper sizes
 * 
 * When to Use:
 * - Hero images
 * - Product photos
 * - Gallery items
 * - Standalone illustrations
 * - Any content that needs a prominent image
 */
export const Image: React.FC<ImageProps> = ({
  className = "",
  image,
}) => {
  // Process the Uniform asset parameter
  // Assets come as arrays, so we take the first one
  const imageAssets = image ?? [];
  const [firstAsset] = imageAssets;
  
  // Generate optimized image URL with transformations
  const imageUrl = firstAsset
    ? imageFrom(firstAsset)
        .transform({ 
          width: 800,    // Resize to 800px width
          height: 600,   // Resize to 600px height  
          fit: "cover",   // Smart crop to maintain aspect ratio
          focal: firstAsset.fields?.focalPoint?.value || "center" // Focal point support for precise positioning
        })
        .url()
    : undefined;

  // Extract alt text from asset metadata (important for accessibility)
  const imageAlt = firstAsset?.fields?.description?.value || 
                  firstAsset?.fields?.title?.value || 
                  'Image';

  return (
    <section className={`py-12 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* IMAGE TITLE: Editable heading for the image */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          <UniformText
            placeholder="Image title goes here"
            parameterId="title"
            as="span"
          />
        </h2>
        
        {/* IMAGE CONTAINER: Responsive with proper aspect ratio */}
        <div className="mb-6">
          {imageUrl ? (
            // ACTUAL IMAGE: Optimized and responsive
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg bg-gray-100">
              <NextImage
                src={imageUrl}
                alt={imageAlt}
                fill // Fills the container
                className="object-cover" // Maintains aspect ratio
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
              />
            </div>
          ) : (
            // PLACEHOLDER: Shown when no image is selected
            <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                  {/* Image icon SVG */}
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm">Select an image in the panel →</p>
              </div>
            </div>
          )}
        </div>

        {/* IMAGE CAPTION: Optional descriptive text */}
        <div className="text-gray-600 max-w-2xl mx-auto">
          <UniformText
            placeholder="Image caption goes here"
            parameterId="caption"
            as="p"
            className="text-sm italic"
          />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION: Makes this component available for image content
// Perfect for galleries, hero images, product photos, or any standalone images
registerUniformComponent({
  type: "image",
  component: Image,
});

export default Image;
