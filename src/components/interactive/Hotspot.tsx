import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ComponentProps,
  UniformSlot,
  registerUniformComponent,
  useUniformContextualEditingState,
} from "@uniformdev/canvas-react";
import type { AssetParamValue } from "@uniformdev/assets";
import NextImage from "next/image";
import { getTransformedImageUrl } from "@/utilities/canvas/imageTransform";
import { cn } from "@/lib/utils";
import type { ComponentInstance } from "@uniformdev/canvas";

/**
 * Position options for hotspot tooltip
 */
export type TooltipPosition =
  | "top"
  | "top-right"
  | "top-left"
  | "right"
  | "right-top"
  | "right-bottom"
  | "bottom"
  | "bottom-right"
  | "bottom-left"
  | "left"
  | "left-top"
  | "left-bottom"
  | "center";

/**
 * Transparency/opacity options
 */
export type AvailableTransparency =
  | "0%"
  | "10%"
  | "20%"
  | "30%"
  | "40%"
  | "50%"
  | "60%"
  | "70%"
  | "80%"
  | "90%"
  | "100%";

/**
 * Tooltip width options
 */
export type TooltipWidth =
  | "sm"   // ~384px
  | "md"   // ~448px
  | "lg"   // ~512px (default)
  | "xl"   // ~576px
  | "2xl"; // ~672px

export interface HotspotProps extends ComponentProps {
  className?: string;
  /** Icon to display at hotspot location */
  icon?: AssetParamValue;
  /** Horizontal position (0-100 percentage) */
  x?: number;
  /** Vertical position (0-100 percentage) */
  y?: number;
  /** Position of tooltip relative to hotspot */
  tooltipPosition?: TooltipPosition;
  /** Width of the tooltip container */
  tooltipWidth?: TooltipWidth;
  /** Initial transparency/opacity of hotspot icon */
  initialTransparency?: AvailableTransparency;
}

/**
 * Get all child component IDs recursively
 */
const getAllChildrenIds = (component: ComponentInstance): string[] => {
  let ids: string[] = [component._id || ""];

  for (const key in component.slots) {
    if (component.slots.hasOwnProperty(key)) {
      const childComponents = component.slots[key];
      childComponents.forEach((childComponent) => {
        ids = ids.concat(getAllChildrenIds(childComponent));
      });
    }
  }

  return ids;
};

/**
 * Get tooltip position classes based on position prop
 */
const getPosition = (position?: TooltipPosition): string => {
  switch (position) {
    case "top":
      return "-translate-x-1/2 -translate-y-full pb-8";
    case "top-right":
      return "-translate-y-full -translate-x-3 pb-8";
    case "right-top":
      return "-translate-y-[calc(50%+0.75rem)] pl-8";
    case "right":
      return "-translate-y-1/2 pl-8";
    case "right-bottom":
      return "-translate-y-[calc(50%-0.75rem)] pl-8";
    case "bottom-right":
      return "-translate-x-3 pt-8";
    case "bottom":
      return "-translate-x-1/2 pt-8";
    case "bottom-left":
      return "-translate-x-[calc(100%-0.75rem)] pt-8";
    case "left-bottom":
      return "-translate-x-full -translate-y-[calc(50%-0.75rem)] pr-8";
    case "left":
      return "-translate-x-full -translate-y-1/2 pr-8";
    case "left-top":
      return "-translate-x-full -translate-y-[calc(50%+0.75rem)] pr-8";
    case "top-left":
      return "-translate-x-[calc(100%-0.75rem)] -translate-y-full pb-8";
    case "center":
    default:
      return "-translate-x-1/2 -translate-y-1/2";
  }
};

/**
 * Get opacity class based on transparency percentage
 */
const getTransparency = (value?: AvailableTransparency): string => {
  switch (value) {
    case "0%":
      return "opacity-100";
    case "10%":
      return "opacity-90";
    case "20%":
      return "opacity-80";
    case "30%":
      return "opacity-70";
    case "40%":
      return "opacity-60";
    case "50%":
      return "opacity-50";
    case "60%":
      return "opacity-40";
    case "70%":
      return "opacity-30";
    case "80%":
      return "opacity-20";
    case "90%":
      return "opacity-10";
    case "100%":
      return "opacity-0";
    default:
      return "opacity-100";
  }
};

/**
 * Get width class based on tooltip width option
 */
const getTooltipWidth = (width?: TooltipWidth): string => {
  switch (width) {
    case "sm":
      return "sm:min-w-[384px] sm:max-w-sm"; // ~384px
    case "md":
      return "sm:min-w-[448px] sm:max-w-md"; // ~448px
    case "lg":
      return "sm:min-w-[512px] sm:max-w-lg"; // ~512px (default)
    case "xl":
      return "sm:min-w-[576px] sm:max-w-xl"; // ~576px
    case "2xl":
      return "sm:min-w-[672px] sm:max-w-2xl"; // ~672px
    default:
      return "sm:min-w-[512px] sm:max-w-lg"; // default to lg
  }
};

/**
 * Hotspot - Interactive marker with tooltip content
 *
 * An interactive hotspot component that displays an icon at a specific position
 * on an image and shows a tooltip with content when clicked or selected.
 *
 * Features:
 * - Configurable position (x, y coordinates as percentages)
 * - Custom icon support
 * - Multiple tooltip position options (12 positions)
 * - Adjustable tooltip width (sm to 2xl)
 * - Adjustable initial transparency
 * - Click to toggle tooltip
 * - Click outside to close
 * - Auto-opens in Uniform Canvas when selected
 * - Smooth animations and hover effects
 * - Supports any content via UniformSlot
 *
 * Use Cases:
 * - Shoppable lifestyle images
 * - Product feature callouts
 * - Interactive room scenes
 * - Annotated product photos
 * - Educational content markers
 *
 * Design Notes:
 * - Position is specified as numeric percentage (0-100, e.g., 50 for center)
 * - Tooltip width can be sm (384px), md (448px), lg (512px), xl (576px), or 2xl (672px)
 * - Default icon is 24x24px, scales to 30x30px on hover/active
 * - Tooltip automatically positions to avoid viewport edges
 * - Canvas editor: tooltip opens when hotspot or child content is selected
 * - Uses backdrop to detect clicks outside tooltip
 */
export const Hotspot: FC<HotspotProps> = ({
  className = "",
  icon,
  x = 50,
  y = 50,
  tooltipPosition = "top",
  tooltipWidth = "lg",
  initialTransparency = "0%",
  component,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onClickSpot = useCallback(() => setIsOpen((prevState) => !prevState), []);

  const { previewMode, selectedComponentReference } = useUniformContextualEditingState({ global: true });
  const isContextualEditing = previewMode === "editor";

  // Convert numeric values to percentage strings for CSS
  const normalizedX = `${x}%`;
  const normalizedY = `${y}%`;

  // Get all child component IDs for selection detection
  const allComponentChildrenIds = useMemo(
    () => (component ? getAllChildrenIds(component) : []),
    [component]
  );

  // Check if a child component is selected in Canvas
  const isChildComponentSelected =
    selectedComponentReference && allComponentChildrenIds.includes(selectedComponentReference?.id);

  // Handle clicks outside the hotspot to close tooltip
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Extract icon image
  const iconAssets = icon ?? [];
  const [firstAsset] = iconAssets;

  const iconUrl = getTransformedImageUrl(firstAsset, {
    width: 48,
    height: 48,
    fit: "contain",
    quality: 90,
  });

  const iconAlt =
    firstAsset?.fields?.description?.value ||
    firstAsset?.fields?.title?.value ||
    "Hotspot icon";

  if (!iconUrl) {
    // Show placeholder in Canvas editor
    return isContextualEditing ? (
      <div
        className={cn(
          "absolute z-10 -translate-x-1/2 -translate-y-1/2",
          className
        )}
        style={{ top: normalizedY, left: normalizedX }}
      >
        <div className="w-6 h-6 rounded-full bg-primary/50 border-2 border-background flex items-center justify-center">
          <span className="text-[10px] text-background font-bold">+</span>
        </div>
      </div>
    ) : null;
  }

  // Tooltip is open if: user clicked it OR in Canvas and child is selected
  const isTooltipOpened = isContextualEditing ? isChildComponentSelected : isOpen;

  return (
    <div ref={ref} className={className}>
      {/* Hotspot Icon Button */}
      <button
        className={cn(
          "absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 cursor-pointer",
          "hover:scale-125 hover:opacity-100",
          getTransparency(initialTransparency),
          {
            "scale-125 opacity-100!": isTooltipOpened,
          }
        )}
        style={{ top: normalizedY, left: normalizedX }}
        onClick={onClickSpot}
        aria-label="Show product details"
      >
        <div className="relative w-6 h-6">
          <NextImage src={iconUrl} alt={iconAlt} fill className="object-contain" />
        </div>
      </button>

      {/* Tooltip Content */}
      <div
        className={cn(
          "absolute z-20 transition-opacity duration-700 opacity-0 pointer-events-none",
          "max-w-[calc(100vw-2rem)]",
          getTooltipWidth(tooltipWidth),
          getPosition(tooltipPosition),
          {
            "opacity-100 pointer-events-auto": isTooltipOpened,
          }
        )}
        style={{ top: normalizedY, left: normalizedX }}
      >
        <UniformSlot name="content" />
      </div>
    </div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "hotspot",
  component: Hotspot,
});

export default Hotspot;

