import React, { useState, useEffect } from "react";
// Uniform imports for component playground functionality
import { UniformPlayground } from "@uniformdev/canvas-react";
import { RootComponentInstance } from "@uniformdev/canvas";
import "../../components/page/page"; // Import all component registrations
import { ResizablePlaygroundDecorator } from "../../components/playground/resizable-playground-decorators";

export type PlaygroundProps = {
  data?: RootComponentInstance | null; // Optional composition data
};

/**
 * Uniform Component Playground - Component Pattern Designer
 * 
 * This page provides a sandbox environment for designing and testing
 * Uniform component patterns. It's an essential tool for developers
 * and content authors to preview components in isolation.
 * 
 * Features:
 * - Interactive component testing
 * - Responsive preview controls
 * - Real-time component editing
 * - Pattern design and testing
 * - Isolated component development
 * 
 * How it works:
 * 1. Developers register components with Uniform
 * 2. Content authors access this playground via Uniform dashboard
 * 3. They can test components with different content
 * 4. Create reusable component patterns
 * 5. Preview responsive behavior
 * 
 * Decorators:
 * - ResizablePlaygroundDecorator: Adds responsive preview controls
 * - Allows testing components at different screen sizes
 * 
 * Access:
 * - Available at /uniform-playground/pattern-playground
 * - Integrated with Uniform dashboard
 * - Used by content authors for component pattern creation
 */
export const PlaygroundPage = ({ data }: PlaygroundProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Font inheritance: Let the playground use the same fonts as the main app
    // This ensures components look the same in playground as they do live
  }, []);

  // Prevent hydration mismatch by only rendering on client
  // This is important for SSR compatibility
  if (!isClient) {
    return <div>Loading playground...</div>;
  }

  // Default playground mode (no specific composition)
  if (!data) {
    return (
      <UniformPlayground
        decorators={[ResizablePlaygroundDecorator]} // Add responsive preview controls
        contextualEditingDefaultPlaceholder="Placeholder Text" // Default placeholder text
      />
    );
  }

  // Playground with specific composition data
  return <UniformPlayground decorators={[ResizablePlaygroundDecorator]} />;
};

export default PlaygroundPage;
