import React from "react";
import { UniformText, registerUniformComponent } from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";

export interface ColorChipProps {
  className?: string;
  /** Color code (e.g., "17-1230") */
  colorCode?: string;
  /** Color name (e.g., "Mocha Mousse") */
  colorName?: string;
  /** Hex color value */
  colorHex?: string;
}

/**
 * ColorChip - Pantone-style color swatch component
 *
 * A card-style color chip that displays a color swatch with its
 * Pantone code and name. Used within CollaborationHero for showcasing
 * brand collaboration colors.
 *
 * Features:
 * - Square color swatch display
 * - Pantone code and name labels
 * - Hover animation effect
 * - Clean card-style design
 */
export const ColorChip: React.FC<ColorChipProps> = ({
  className = "",
  colorCode = "17-1230",
  colorName = "Mocha Mousse",
  colorHex = "#A47148",
}) => {
  return (
    <div
      className={cn(
        "bg-white p-2 shadow-lg hover:scale-105 transition-transform cursor-pointer rounded",
        className
      )}
    >
      <div
        className="w-20 h-20 rounded-sm"
        style={{ backgroundColor: colorHex }}
      />
      <div className="pt-2 text-left">
        <p className="text-[10px] text-muted-foreground tracking-wider">
          PANTONE
        </p>
        <p className="text-xs font-bold">
          <UniformText
            parameterId="colorCode"
            placeholder="17-1230"
            as="span"
          />
        </p>
        <p className="text-[10px] text-muted-foreground truncate">
          <UniformText
            parameterId="colorName"
            placeholder="Mocha Mousse"
            as="span"
          />
        </p>
      </div>
    </div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "colorChip",
  component: ColorChip,
});

export default ColorChip;

