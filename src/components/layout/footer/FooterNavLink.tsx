import React from 'react';
import { UniformText, registerUniformComponent } from '@uniformdev/canvas-react';
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Link parameter type from Uniform
 */
interface UniformLink {
  type: string;
  path?: string;
  url?: string;
}

export interface FooterNavLinkProps {
  className?: string;
  /** Link destination */
  link?: UniformLink;
}

/**
 * Footer Navigation Link Component - Simple Footer Links
 *
 * A lightweight navigation link component specifically designed for footer use.
 * Unlike the main NavigationLink, this component has simpler styling and
 * doesn't need mobile menu integration.
 *
 * Features:
 * - Editable link text (UniformText)
 * - Uniform link parameter support
 * - Subtle hover effects
 * - Consistent footer styling
 * - Responsive text sizing
 *
 * Styling:
 * - Small text size (text-sm)
 * - Muted colors (text-background/70 → text-background on hover)
 * - Smooth transitions
 * - No button styling (just text links)
 *
 * Common Use Cases:
 * - Shop category links
 * - Company pages
 * - Support pages
 * - Legal pages
 *
 * Used in FooterLinkGroup component's links slot.
 */
export const FooterNavLink: React.FC<FooterNavLinkProps> = ({
  className = '',
  link
}) => {
  const href = link?.path || link?.url || "#";

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "text-sm text-background/70 hover:text-background transition-colors",
          className
        )}
      >
        <UniformText
          placeholder="Link goes here"
          parameterId="text"
          as="span"
          className="inline"
        />
      </Link>
    </li>
  );
};

// UNIFORM REGISTRATION: Makes this component available in footer slots
// Used in FooterLinkGroup component's links slot for building footer navigation
registerUniformComponent({
  type: "footerNavLink",
  component: FooterNavLink,
});

export default FooterNavLink;
