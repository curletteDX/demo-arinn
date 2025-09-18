import React from "react";
// Uniform imports for creating layout components
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";

export interface CardGridProps {
  className?: string;
}

/**
 * Card Grid Component - Layout Container for Cards
 * 
 * This component creates a responsive grid layout for displaying cards.
 * It provides a clean, organized way to showcase multiple pieces of content
 * like features, services, team members, or any card-based content.
 * 
 * Features:
 * - Editable grid title
 * - Responsive grid layout (1 column mobile → 2 tablet → 3 desktop)
 * - UniformSlot for adding cards dynamically
 * - Consistent spacing and alignment
 * - Background section styling
 * 
 * Grid Behavior:
 * - Mobile: 1 column (stacked)
 * - Tablet (md): 2 columns  
 * - Desktop (lg): 3 columns
 * 
 * Supported Card Types:
 * - Card: Basic text cards
 * - ImageFeature: Cards with icons/images
 * - Any component registered to work in card slots
 * 
 * This component demonstrates the power of UniformSlot - content authors
 * can add as many cards as needed without developer involvement.
 */
export const CardGrid: React.FC<CardGridProps> = ({
  className = "",
}) => {
  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* GRID HEADER: Centered title for the entire grid */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <UniformText
              placeholder="Grid title goes here"
              parameterId="title"
              as="span" // Renders as span inside h2
            />
          </h2>
        </div>
        
        {/* RESPONSIVE GRID: Automatically adjusts columns based on screen size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* UNIFORM SLOT: Content authors can add card components here */}
          {/* Each card will automatically fit into the grid layout */}
          <UniformSlot name="cards" />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION: Makes this layout component available
// Perfect for creating feature sections, service grids, team pages, etc.
registerUniformComponent({
  type: "cardGrid",
  component: CardGrid,
});

export default CardGrid;
