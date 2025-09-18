import React from "react";
// Uniform imports for creating editable content components
import {
  UniformText,
  UniformRichText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { resolveRichTextRenderer } from "../../lib/richTextRenderers";

export interface SectionProps {
  className?: string;
  variant?: string; // Determines which visual style to use
}

/**
 * Section Component - Flexible Content Section
 * 
 * This is a versatile component that can display content in different styles.
 * It demonstrates how one component can serve multiple purposes through variants.
 * 
 * Available Variants:
 * - "hero": Large, prominent section for page headers (h1, large text)
 * - "content": Standard content section (h2, medium text) [DEFAULT]
 * - "feature": Blue-themed section for highlighting features  
 * - "testimonial": Green-themed section for customer quotes
 * - "callout": Yellow-themed section for important announcements
 * - "minimal": Compact section with small text
 * 
 * Uniform Features Used:
 * - UniformText: Editable text fields
 * - UniformRichText: Rich text editor with formatting
 * - UniformSlot: Area where authors can add CTA buttons
 * 
 * Benefits of Variants:
 * - Reduces component complexity (one component vs. six)
 * - Consistent editing experience for content authors
 * - Easy to add new variants without new components
 */
export const Section: React.FC<SectionProps> = ({ 
  className = "",
  variant = "content" // Default to standard content styling
}) => {
  // Function that returns styling configuration based on the selected variant
  // This centralizes all variant logic in one place for easy maintenance
  const getVariantStyles = () => {
    switch (variant) {
      case "hero":
        // HERO VARIANT: Large, prominent styling for page headers
        return {
          section: `py-20 px-6 text-center ${className}`, // Extra padding, centered
          container: "max-w-4xl mx-auto", // No background - clean and minimal
          title: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900", // Very large text
          description: "text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-600", // Large description
          cta: "flex flex-col sm:flex-row gap-4 justify-center items-center", // Button layout
          titleTag: "h1" as const, // Semantic HTML - this is the main page heading
          titlePlaceholder: "Hero title goes here",
          descriptionPlaceholder: "Hero description goes here"
        };
      
      case "feature":
        return {
          section: `py-16 px-6 text-center ${className}`,
          container: "max-w-5xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-8",
          title: "text-3xl md:text-4xl font-bold mb-6 text-blue-900",
          description: "text-lg text-blue-700 max-w-3xl mx-auto leading-relaxed mb-8",
          cta: "mt-8 [&:empty]:hidden",
          titleTag: "h2" as const,
          titlePlaceholder: "Feature title goes here",
          descriptionPlaceholder: "Feature description goes here"
        };
      
      case "testimonial":
        return {
          section: `py-16 px-6 text-center ${className}`,
          container: "max-w-3xl mx-auto bg-green-50 border border-green-200 rounded-lg p-8",
          title: "text-2xl md:text-3xl font-semibold mb-6 text-green-900",
          description: "text-lg text-green-700 italic leading-relaxed mb-8",
          cta: "mt-8 [&:empty]:hidden",
          titleTag: "h3" as const,
          titlePlaceholder: "Testimonial or quote title goes here",
          descriptionPlaceholder: "Customer testimonial or quote goes here"
        };
      
      case "callout":
        return {
          section: `py-12 px-6 text-center ${className}`,
          container: "max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-8",
          title: "text-2xl md:text-3xl font-bold mb-4 text-yellow-900",
          description: "text-base text-yellow-800 leading-relaxed mb-6",
          cta: "mt-6 [&:empty]:hidden",
          titleTag: "h3" as const,
          titlePlaceholder: "Important callout title goes here",
          descriptionPlaceholder: "Important information or announcement goes here"
        };
      
      case "minimal":
        return {
          section: `py-8 px-6 text-center ${className}`,
          container: "max-w-2xl mx-auto",
          title: "text-xl md:text-2xl font-medium mb-4 text-gray-900",
          description: "text-base text-gray-600 leading-relaxed mb-6",
          cta: "mt-6 [&:empty]:hidden",
          titleTag: "h4" as const,
          titlePlaceholder: "Simple title goes here",
          descriptionPlaceholder: "Brief description goes here"
        };
      
      default: // "content"
        return {
          section: `py-16 px-4 text-center ${className}`,
          container: "max-w-4xl mx-auto",
          title: "text-3xl md:text-4xl font-bold mb-6 text-gray-900",
          description: "text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8",
          cta: "mt-8 [&:empty]:hidden",
          titleTag: "h2" as const,
          titlePlaceholder: "Title goes here",
          descriptionPlaceholder: "Content goes here"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* UNIFORM TEXT: Editable text field for the section title */}
        <UniformText
          placeholder={styles.titlePlaceholder} // Shown when empty
          parameterId="title" // ID for this content field
          as={styles.titleTag} // HTML tag (h1, h2, etc.)
          className={styles.title} // Styling classes
        />
        
        {/* UNIFORM RICH TEXT: Full rich text editor with formatting options */}
        <div className={styles.description}>
          <UniformRichText
            placeholder={styles.descriptionPlaceholder}
            parameterId="description"
            resolveRichTextRenderer={resolveRichTextRenderer} // Handles rich text rendering
          />
        </div>
        
        {/* CTA SLOT: Area where content authors can add call-to-action buttons */}
        <div className={styles.cta}>
          <UniformSlot name="cta" />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION: Makes this component available in Uniform's visual editor
// Content authors can then choose from all available variants in a dropdown
registerUniformComponent({
  type: "section",
  component: Section,
});

export default Section;
