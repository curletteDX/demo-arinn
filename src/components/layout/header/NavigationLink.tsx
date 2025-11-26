import React from 'react';
// Uniform imports for creating navigation links
import { UniformText } from '@uniformdev/canvas-react';
import Link from 'next/link'; // Next.js optimized navigation
import { registerUniformComponent } from '@uniformdev/canvas-react';
import { LinkParamValue, ProjectMapLinkParamValue } from '@uniformdev/canvas';

export interface NavigationLinkProps {
  linkText?: string;
  linkUrl?: LinkParamValue | ProjectMapLinkParamValue; // Uniform link parameter
  isMobile?: boolean;
  onClick?: () => void;
  highlight?: boolean; // Show "New" badge
}

/**
 * Navigation Link Component - Responsive Navigation Links
 *
 * This component creates navigation links that work in both desktop and mobile
 * contexts. It automatically adapts its styling based on where it's used.
 *
 * Features:
 * - Editable link text (UniformText)
 * - Uniform link parameter (supports internal/external links)
 * - Responsive styling (different for mobile vs desktop)
 * - Mobile menu integration (auto-closes menu on click)
 * - Consistent button styling
 * - Automatic context detection
 *
 * Context Detection:
 * - Desktop: Horizontal layout, subtle hover effects
 * - Mobile: Full-width buttons, larger touch targets
 * - Auto-detects context by checking DOM for mobile container
 *
 * Link Types Supported:
 * - Internal pages (Next.js routing)
 * - External URLs
 * - Project map links (Uniform routing)
 *
 * Used in Header component's navigationLinks slot.
 */
export const NavigationLink: React.FC<NavigationLinkProps> = ({
  linkUrl,
  isMobile = false,
  onClick,
  highlight = false,
}) => {
  // Smart context detection: check if we're inside a mobile navigation container
  // This allows the same component to work in both desktop and mobile layouts
  const isInMobileContext = isMobile || (typeof window !== 'undefined' && document.querySelector('.mobile-navigation-context'));

  // Dynamic styling based on context (mobile vs desktop) and highlight
  const linkClassName = isInMobileContext
    ? `text-lg font-medium transition-colors flex items-center gap-1.5 ${
        highlight ? "text-primary hover:text-primary/80" : "text-foreground hover:text-primary"
      }`
    : `text-sm font-medium transition-colors flex items-center gap-1.5 ${
        highlight
          ? "text-primary hover:text-primary/80"
          : "text-muted-foreground hover:text-foreground"
      }`;

  const handleClick = () => {
    // Call any additional onClick handler
    // Note: SheetClose will handle closing the Sheet menu automatically
    if (onClick) {
      onClick();
    }
  };

  // Function to render the appropriate link based on Uniform link parameter
  // Render the appropriate link based on Uniform link parameter type
  const renderLink = (linkData: LinkParamValue | ProjectMapLinkParamValue | undefined) => {
    // If the link is a project map node, we can get the node id, dynamic input values, and project map id
    if (linkData?.type === "projectMapNode") {
      // Access node metadata if needed: linkData.nodeId, linkData.dynamicInputValues, linkData.projectMapId
      // Use the path for the URL
      const url = linkData?.path?.length ? linkData.path : "#";

      return (
        <Link href={url} onClick={handleClick} className={linkClassName}>
          <UniformText parameterId="linkText" placeholder="Link goes here" as="span" />
          {highlight && (
            <span className={`${isInMobileContext ? "ml-2 text-xs" : "text-[10px]"} bg-primary text-primary-foreground px-1.5 py-0.5 rounded`}>
              New
            </span>
          )}
        </Link>
      );
    }

    // For URL links
    if (linkData?.type === "url") {
      const url = linkData?.path?.length ? linkData.path : "#";

      return (
        <Link href={url} onClick={handleClick} className={linkClassName}>
          <UniformText parameterId="linkText" placeholder="Link goes here" as="span" />
          {highlight && (
            <span className={`${isInMobileContext ? "ml-2 text-xs" : "text-[10px]"} bg-primary text-primary-foreground px-1.5 py-0.5 rounded`}>
              New
            </span>
          )}
        </Link>
      );
    }

    // For email or telephone links
    if (linkData?.type === "email" || linkData?.type === "tel") {
      return (
        <a href={linkData?.path} onClick={handleClick} className={linkClassName}>
          <UniformText parameterId="linkText" placeholder="Link goes here" as="span" />
          {highlight && (
            <span className={`${isInMobileContext ? "ml-2 text-xs" : "text-[10px]"} bg-primary text-primary-foreground px-1.5 py-0.5 rounded`}>
              New
            </span>
          )}
        </a>
      );
    }

    // Fallback - render as Link with # href
    return (
      <Link href="#" onClick={handleClick} className={linkClassName}>
        <UniformText parameterId="linkText" placeholder="Link text" as="span" />
        {highlight && (
          <span className={`${isInMobileContext ? "ml-2 text-xs" : "text-[10px]"} bg-primary text-primary-foreground px-1.5 py-0.5 rounded`}>
            New
          </span>
        )}
      </Link>
    );
  };

  return renderLink(linkUrl);
};

// UNIFORM REGISTRATION: Makes this component available in navigation slots
// Used in Header component's navigationLinks slot for building menus
registerUniformComponent({
  type: "navigationLink",
  component: NavigationLink,
});

export default NavigationLink;
