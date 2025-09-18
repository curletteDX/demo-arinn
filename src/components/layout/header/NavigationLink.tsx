import React from 'react';
// Uniform imports for creating navigation links
import { UniformText } from '@uniformdev/canvas-react';
import Link from 'next/link'; // Next.js optimized navigation
import { Button } from '../../ui/button'; // Consistent button styling
import { registerUniformComponent } from '@uniformdev/canvas-react';
import { useMobileMenu } from '../../../contexts/MobileMenuContext';
import { LinkParamValue, ProjectMapLinkParamValue } from '@uniformdev/canvas';

export interface NavigationLinkProps {
  linkText?: string;
  linkUrl?: LinkParamValue | ProjectMapLinkParamValue; // Uniform link parameter
  isMobile?: boolean;
  onClick?: () => void;
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
}) => {
  // Mobile menu context for closing menu on navigation
  const mobileMenu = useMobileMenu();

  // Smart context detection: check if we're inside a mobile navigation container
  // This allows the same component to work in both desktop and mobile layouts
  const isInMobileContext = isMobile || (typeof window !== 'undefined' && document.querySelector('.mobile-navigation-context'));

  // Dynamic styling based on context (mobile vs desktop)
  const buttonClassName = isInMobileContext
    ? "w-full text-left justify-start font-medium px-4 py-3 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all duration-200 text-[#1D1D1F] hover:text-ui-primary" // Mobile: full width, larger padding
    : "font-medium px-4 py-2 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all duration-200 text-[#1D1D1F] hover:text-ui-primary"; // Desktop: compact, horizontal

  const handleClick = () => {
    // Close mobile menu if we're in mobile context
    if (isInMobileContext && mobileMenu) {
      mobileMenu.close();
    }
    // Call any additional onClick handler
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
        <Link href={url} onClick={handleClick}>
          <Button
            variant="ghost"
            size="sm"
            className={buttonClassName}
          >
            <UniformText parameterId="linkText" placeholder="Link goes here" />
          </Button>
        </Link>
      );
    }

    // For URL links
    if (linkData?.type === "url") {
      const url = linkData?.path?.length ? linkData.path : "#";
      
      return (
        <Link href={url} onClick={handleClick}>
          <Button
            variant="ghost"
            size="sm"
            className={buttonClassName}
          >
            <UniformText parameterId="linkText" placeholder="Link goes here" />
          </Button>
        </Link>
      );
    }

    // For email or telephone links
    if (linkData?.type === "email" || linkData?.type === "tel") {
      return (
        <a href={linkData?.path} onClick={handleClick}>
          <Button
            variant="ghost"
            size="sm"
            className={buttonClassName}
          >
            <UniformText parameterId="linkText" placeholder="Link goes here" />
          </Button>
        </a>
      );
    }

    // Fallback - render as Link with # href
    return (
      <Link href="#" onClick={handleClick}>
        <Button
          variant="ghost"
          size="sm"
          className={buttonClassName}
        >
          <UniformText parameterId="linkText" placeholder="Link text" />
        </Button>
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
