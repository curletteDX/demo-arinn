import { useUniformContext } from "@uniformdev/context-react";
import { useEffect } from "react";

/**
 * useSetViewportQuirk Hook - Device Type Detection for Uniform
 * 
 * This hook automatically detects the current device type (mobile/tablet/desktop)
 * and sets a "deviceType" quirk in Uniform Context. This enables content authors
 * to create device-specific visibility rules and personalization in Uniform.
 * 
 * How it works:
 * 1. Listens to window resize events
 * 2. Determines device type based on viewport width
 * 3. Updates Uniform Context with deviceType quirk
 * 4. Enables visibility rules in Uniform components
 * 
 * Device Type Detection:
 * - Mobile: < 640px (matches Tailwind 'sm' breakpoint)
 * - Tablet: 640px - 1023px (between 'sm' and 'lg')
 * - Desktop: ≥ 1024px (matches Tailwind 'lg' breakpoint)
 * 
 * Uniform Integration:
 * - Sets quirk values: "m" (mobile), "t" (tablet), "d" (desktop)
 * - Content authors can use these in visibility rules
 * - Enables responsive content management in Uniform
 * 
 * Performance:
 * - Debounced resize handling (50ms delay)
 * - Only updates when device type actually changes
 * - Cleans up event listeners on unmount
 * 
 * Usage in Uniform:
 * - Create visibility rules based on deviceType quirk
 * - Show/hide components per device type
 * - Personalize content for different screen sizes
 * 
 * Tailwind CSS Breakpoints Reference:
 * - sm: 640px   (small screens and up)
 * - md: 768px   (medium screens and up)
 * - lg: 1024px  (large screens and up)
 * - xl: 1280px  (extra large screens and up)
 * - 2xl: 1536px (2x extra large screens and up)
 */

const BREAKPOINTS = {
  mobile: 640,   // <640px = mobile (below Tailwind 'sm')
  tablet: 1024,  // 640–1023px = tablet (between 'sm' and 'lg')
  desktop: 1024, // ≥1024px = desktop (Tailwind 'lg' and up)
};

export function useSetViewportQuirk() {
  // Get Uniform context (gracefully handle missing provider)
  const context = useUniformContext({ throwOnMissingProvider: false });

  useEffect(() => {
    // Debounce utility to prevent excessive updates during resize
    const debounce = (func: () => void, delay: number) => {
      let debounceTimer: ReturnType<typeof setTimeout>;
      return () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
      };
    };

    // Function to determine device type and update Uniform Context
    const updateQuirk = () => {
      const width = window.innerWidth;
      let deviceType: "m" | "t" | "d" = "d"; // Default to desktop

      // Determine device type based on viewport width
      if (width < BREAKPOINTS.mobile) {
        deviceType = "m";      // Mobile: < 640px
      } else if (width < BREAKPOINTS.tablet) {
        deviceType = "t";      // Tablet: 640px - 1023px
      } else {
        deviceType = "d";      // Desktop: ≥ 1024px
      }

      // Update Uniform Context with deviceType quirk
      // This enables visibility rules in Uniform components
      context?.context.update({
        quirks: { deviceType },
      });
    };

    // Create debounced version to prevent excessive calls during resize
    const debouncedHandler = debounce(updateQuirk, 50);

    // Set initial device type on mount
    updateQuirk();
    
    // Listen for viewport changes
    window.addEventListener("resize", debouncedHandler);
    
    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", debouncedHandler);
  }, [context?.context]); // Re-run if context changes
}
