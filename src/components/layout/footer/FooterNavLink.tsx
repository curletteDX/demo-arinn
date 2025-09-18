import React from 'react';
// Uniform imports for creating footer navigation links
import { UniformText, registerUniformComponent } from '@uniformdev/canvas-react';
import Link from "next/link"; // Next.js optimized navigation

export interface FooterNavLinkProps {
  className?: string;
  link?: {
    path: string; // URL destination
  };
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
 * - Simple link parameter
 * - Subtle hover effects
 * - Consistent footer styling
 * - Responsive text sizing
 * 
 * Styling:
 * - Small text size (text-sm)
 * - Muted colors (gray-600 → gray-900 on hover)
 * - Smooth transitions
 * - No button styling (just text links)
 * 
 * Common Use Cases:
 * - Privacy Policy links
 * - Terms of Service
 * - Contact information
 * - About pages
 * - Social media links
 * 
 * Used in Footer component's footerLinks slot.
 */
export const FooterNavLink: React.FC<FooterNavLinkProps> = ({ 
  className = '',
  link
}) => {
  const href = link?.path || "#";
  
  return (
    <Link 
      href={href} 
      className={`block text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300 ${className}`}
    >
      {/* UNIFORM TEXT: Editable link text for footer navigation */}
      <UniformText
        placeholder="Link goes here"
        parameterId="text"
        as="span"
        className="inline"
      />
    </Link>
  );
};

// UNIFORM REGISTRATION: Makes this component available in footer slots
// Used in Footer component's footerLinks slot for building footer navigation
registerUniformComponent({
  type: "footerNavLink",
  component: FooterNavLink,
});

export default FooterNavLink;
