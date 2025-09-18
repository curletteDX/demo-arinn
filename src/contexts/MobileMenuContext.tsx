import React, { createContext, useContext, useState } from 'react';

/**
 * Mobile Menu Context - Mobile Navigation State Management
 * 
 * This context manages the state of the mobile navigation menu across the application.
 * It provides a clean, centralized way to control mobile menu visibility and ensures
 * consistent behavior across different components.
 * 
 * Features:
 * - Global mobile menu state management
 * - Type-safe context with TypeScript
 * - Simple toggle and close operations
 * - Error handling for missing provider
 * - Automatic state management
 * 
 * Context Pattern Benefits:
 * - Avoids prop drilling for menu state
 * - Centralizes mobile menu logic
 * - Makes it easy to control menu from anywhere
 * - Consistent state across all components
 * 
 * Used by:
 * - Header component (menu button and navigation)
 * - NavigationLink components (auto-close on navigation)
 * - Any component that needs to control mobile menu
 */

interface MobileMenuContextType {
  isOpen: boolean;                    // Current menu state
  setIsOpen: (open: boolean) => void; // Direct state setter
  toggle: () => void;                 // Toggle menu open/closed
  close: () => void;                  // Close menu (common action)
}

// Create context with undefined default (requires provider)
const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined);

/**
 * useMobileMenu Hook - Access Mobile Menu State
 * 
 * This custom hook provides type-safe access to the mobile menu context.
 * It includes error handling to ensure it's used within the provider.
 * 
 * Usage:
 * ```tsx
 * const { isOpen, toggle, close } = useMobileMenu();
 * ```
 * 
 * @returns Mobile menu context with state and controls
 * @throws Error if used outside MobileMenuProvider
 */
export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error('useMobileMenu must be used within a MobileMenuProvider');
  }
  return context;
};

interface MobileMenuProviderProps {
  children: React.ReactNode;
}

/**
 * MobileMenuProvider - Context Provider Component
 * 
 * This provider wraps the application to make mobile menu state available
 * to all child components. It manages the menu state and provides control
 * functions to manipulate the menu.
 * 
 * State Management:
 * - Uses React useState for menu open/closed state
 * - Provides toggle function for menu button
 * - Provides close function for navigation links
 * - Defaults to closed state on initial load
 * 
 * Provider Placement:
 * - Wrapped around the entire app in _app.tsx
 * - Available to all components in the application
 * - No nesting restrictions
 */
export const MobileMenuProvider: React.FC<MobileMenuProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // Menu starts closed

  // Helper functions for common menu operations
  const toggle = () => setIsOpen(!isOpen);     // Toggle open/closed state
  const close = () => setIsOpen(false);        // Always close (used by nav links)

  return (
    <MobileMenuContext.Provider value={{ isOpen, setIsOpen, toggle, close }}>
      {children}
    </MobileMenuContext.Provider>
  );
};
