import React, { useState, useEffect } from "react";
// Uniform imports for playground functionality
import { UniformPlaygroundDecorator } from "@uniformdev/canvas-react";
import { IS_RENDERED_BY_UNIFORM_ATTRIBUTE } from "@uniformdev/canvas";

/**
 * Component types supported in the playground
 * This list matches the actual components registered in the project
 */
type ComponentType =
  // Layout Components
  | "page"
  | "header"
  | "navigationLink"
  | "footer"
  | "footerNavLink"
  // Content Components
  | "section"
  | "cta"
  | "richText"
  | "text"
  // Card Components
  | "card"
  | "cardGrid"
  | "imageFeature"
  // Media Components
  | "image"
  | "imageHero"
  | "video";

/**
 * Responsive breakpoint sizes based on Tailwind CSS
 * These match common device widths for accurate responsive testing
 */
const sizes = {
  "Full Width": "100%",    // No width restriction
  "2XL": "1536px",         // Extra large desktop (1536px+)
  XL: "1280px",            // Large desktop (1280px+)
  LG: "1024px",            // Desktop/laptop (1024px+)
  MD: "768px",             // Tablet (768px+)
  SM: "640px",             // Large mobile (640px+)
  XS: "480px",             // Mobile (480px+)
  "2XS": "320px",          // Small mobile (320px+)
};

/**
 * Default preview sizes for different component types
 * Each component type gets a sensible default based on its typical usage and design
 */
const defaultSizes: Record<ComponentType, keyof typeof sizes> = {
  // Layout Components
  page: "Full Width",           // Page layouts are full width
  header: "Full Width",         // Headers span full width
  navigationLink: "SM",         // Navigation links are compact
  footer: "Full Width",         // Footers span full width
  footerNavLink: "SM",          // Footer links are small
  
  // Content Components
  section: "Full Width",        // Sections typically full width (all variants)
  cta: "SM",                    // Call-to-action buttons are compact
  richText: "LG",              // Rich text needs good reading width
  text: "LG",                  // Plain text needs good reading width
  
  // Card Components
  card: "MD",                  // Cards work well at medium size
  cardGrid: "Full Width",      // Card grids need full width for responsive layout
  imageFeature: "MD",          // Feature cards with images at medium size
  
  // Media Components
  image: "LG",                 // Images need good display size
  imageHero: "Full Width",     // Hero images are full width
  video: "LG",                 // Videos need good display size
};

/**
 * Resizable Playground Decorator - Responsive Component Testing
 * 
 * This decorator enhances the Uniform playground with responsive testing capabilities.
 * It wraps components with a container that can be resized to different breakpoints,
 * allowing developers and content authors to test how components look at various screen sizes.
 * 
 * Features:
 * - Responsive breakpoint testing (320px to full width)
 * - Smart default sizing based on component type
 * - Apple-style size selector UI
 * - Real-time size indicator
 * - Smooth transitions between sizes
 * 
 * How it works:
 * 1. Detects the component type being previewed
 * 2. Applies an appropriate default size
 * 3. Provides UI controls to change the preview size
 * 4. Updates the container width to simulate different devices
 * 
 * This is essential for:
 * - Testing responsive design
 * - Ensuring components work on all devices
 * - Content author training and preview
 * - Component pattern validation
 */
export const ResizablePlaygroundDecorator: UniformPlaygroundDecorator = ({
  children,        // The component being previewed
  data,           // Component metadata from Uniform
}) => {
  // Determine component type and set appropriate default size
  const componentType = data?.type as ComponentType | undefined;
  const defaultSize = componentType ? defaultSizes[componentType] : "2XL";
  const [selectedSize, setSelectedSize] = useState(sizes[defaultSize]);

  // Update size when component type changes
  useEffect(() => {
    if (componentType) {
      const newSize = sizes[defaultSizes[componentType]];
      setSelectedSize(newSize);
    }
  }, [componentType]);

  return (
    <div className="flex flex-col items-center">
      {/* COMPONENT PREVIEW CONTAINER: Resizable based on selected size */}
      <div className="w-full" style={{ maxWidth: selectedSize }}>
        {children}
      </div>
      
      {/* RESPONSIVE CONTROLS: Apple-style size selector */}
      <div className="mt-8 mb-4 p-1 bg-gray-100 rounded-xl shadow-inner">
        <div className="flex flex-wrap gap-1">
          {Object.entries(sizes).map(([label, size]) => (
            <button
              key={size}
              className={`
                px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap
                ${selectedSize === size 
                  ? "bg-white text-ui-primary shadow-sm border border-gray-200 scale-[1.02]" 
                  : "text-gray-600 hover:text-ui-primary hover:bg-white/50"
                }
              `}
              onClick={() => setSelectedSize(size)}
              {...{ [IS_RENDERED_BY_UNIFORM_ATTRIBUTE]: true }} // Mark as Uniform UI element
            >
              {label}
            </button>
          ))}
        </div>
        
        {/* SIZE INDICATOR: Shows current selected size with pixel value */}
        <div className="text-center mt-2 text-xs text-gray-500 font-medium">
          {Object.entries(sizes).find(([, size]) => size === selectedSize)?.[0]} 
          <span className="text-gray-400 ml-1">({selectedSize})</span>
        </div>
      </div>
    </div>
  );
};
