import React from "react";
import Link from "next/link";
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";

export interface FooterLinkGroupProps {
  className?: string;
  /** Group title (e.g., "Shop", "Company", "Support") */
  title?: string;
}

/**
 * FooterLinkGroup - A group of footer navigation links
 *
 * A component that displays a titled group of footer links, typically used
 * for organizing navigation into categories like Shop, Company, Support.
 *
 * Features:
 * - Group title (uppercase, semibold)
 * - Slot for adding FooterNavLink components
 * - Vertical list layout
 * - Hover effects on links
 * - All text editable via Uniform
 *
 * Design Notes:
 * - Uses dark background with light text
 * - Spacing optimized for readability
 * - Responsive layout
 *
 * Slot:
 * - `links`: Add FooterNavLink components here
 */
export const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({
  className = "",
}) => {
  return (
    <div className={cn(className)}>
      <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-background">
        <UniformText
          parameterId="title"
          placeholder="Shop"
          as="span"
        />
      </h4>
      <ul className="space-y-3">
        <UniformSlot name="links" />
      </ul>
    </div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "footerLinkGroup",
  component: FooterLinkGroup,
});

export default FooterLinkGroup;

