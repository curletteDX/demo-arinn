import React from 'react';
// Uniform imports for creating footer layout
import { UniformSlot, UniformText, registerUniformComponent } from '@uniformdev/canvas-react';

export interface FooterProps {
  className?: string;
}

/**
 * Footer Component - Website Footer
 * 
 * A clean, minimal footer that provides essential navigation and copyright info.
 * This component uses a flexible layout that works well on all screen sizes.
 * 
 * Features:
 * - Responsive layout (stacked on mobile, horizontal on desktop)
 * - UniformSlot for footer navigation links
 * - Editable copyright text
 * - Light background with subtle border
 * - Consistent spacing and typography
 * 
 * Layout Structure:
 * - Mobile: Links stacked above copyright (centered)
 * - Desktop: Links on left, copyright on right
 * 
 * Content Areas:
 * - footerLinks slot: For FooterNavLink components
 * - copyrightText: Editable copyright notice
 * 
 * This footer is designed to be unobtrusive while providing necessary
 * navigation and legal information.
 */
function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`bg-gray-50 border-t border-gray-200 ${className}`}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* FOOTER NAVIGATION: Links to important pages */}
          <nav className="flex flex-wrap items-center justify-center md:justify-start space-x-6">
            {/* UNIFORM SLOT: Content authors can add FooterNavLink components here */}
            <UniformSlot name="footerLinks" />
          </nav>

          {/* COPYRIGHT TEXT: Editable legal/copyright information */}
          <div className="text-sm text-gray-600">
            <UniformText 
              parameterId="copyrightText" 
              placeholder="Copyright text goes here" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

// UNIFORM REGISTRATION: Makes this component available as a footer
// Used in the Page component's footer slot
registerUniformComponent({
  type: "footer",
  component: Footer,
});

export default Footer;