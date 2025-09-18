import React from 'react';
import { Button } from '../../ui/button';
import { useMobileMenu } from '../../../contexts/MobileMenuContext';
import { Menu, X } from 'lucide-react';
// Uniform imports for creating editable components
import { UniformSlot, registerUniformComponent } from '@uniformdev/canvas-react';

export interface HeaderProps {
  className?: string;
}

/**
 * Header Component - Website Navigation
 * 
 * This is a responsive header that works with Uniform CMS:
 * - Contains UniformSlot for navigation links (editable in Uniform)
 * - Responsive: hamburger menu on mobile, horizontal nav on desktop
 * - Sticky header that stays at top when scrolling
 * 
 * Key Uniform Concepts:
 * - UniformSlot: Creates editable areas where content authors can add components
 * - registerUniformComponent: Makes this React component available in Uniform editor
 */
export function Header({ className = '' }: HeaderProps) {
  // Mobile menu state management
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu } = useMobileMenu();

  return (
    <>
      <header className={`sticky top-0 z-50 w-full bg-white border-b border-gray-200 ${className}`}>
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? 
                <X className="h-5 w-5 text-gray-900" /> : 
                <Menu className="h-5 w-5 text-gray-900" />
              }
            </Button>

            {/* Desktop Navigation - Hidden on mobile, shown on large screens */}
            <nav className="hidden lg:flex items-center space-x-1">
              {/* UNIFORM SLOT: This creates an editable area in Uniform where 
                  content authors can add NavigationLink components */}
              <UniformSlot name="navigationLinks" />
            </nav>

            {/* Mobile menu spacer - keeps layout balanced on mobile */}
            <div className="lg:hidden w-10"></div>
          </div>

          {/* Mobile Navigation - Collapsible menu for mobile devices */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="border-t border-gray-200 bg-white">
              <nav className="py-4 space-y-1">
                <div className="flex flex-col space-y-1 mobile-navigation-context">
                  {/* UNIFORM SLOT: Same navigation links as desktop, but in mobile layout */}
                  <UniformSlot name="navigationLinks" />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

// UNIFORM REGISTRATION: This registers the component with Uniform CMS
// - "type": The ID used in Uniform (must match component definition in Uniform)
// - "component": The React component to render
// After registering, this component becomes available in Uniform's visual editor
registerUniformComponent({
  type: "header",
  component: Header,
});

export default Header;