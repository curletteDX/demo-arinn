
// Uniform imports for creating page layouts
import {
  registerUniformComponent,
  UniformSlot,
} from "@uniformdev/canvas-react";
// Import all components to make them available to Uniform
import "@/components";

/**
 * Page Component - Main Layout Template
 * 
 * This is the root layout component that defines the overall page structure.
 * It uses a flexible layout system that works well for most websites:
 * 
 * Layout Structure:
 * ┌─────────────────┐
 * │     Header      │ <- Fixed header (navigation)
 * ├─────────────────┤
 * │                 │
 * │      Body       │ <- Main content area (grows to fill space)
 * │   (flexible)    │
 * │                 │
 * ├─────────────────┤
 * │     Footer      │ <- Footer (always at bottom)
 * └─────────────────┘
 * 
 * Key Features:
 * - Responsive design (mobile-friendly)
 * - Sticky footer (footer always at bottom even with little content)
 * - Three main content areas that authors can edit in Uniform
 */
function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient">
      {/* HEADER SLOT: Content authors can add header components here */}
      <UniformSlot name="header" />
      
      {/* MAIN CONTENT: flex-1 makes this area grow to fill available space */}
      <main className="flex-1 w-full">
        {/* BODY SLOT: Main content area where most page content goes */}
        <UniformSlot name="body" />
      </main>
      
      {/* FOOTER SLOT: Content authors can add footer components here */}
      <UniformSlot name="footer" />
    </div>
  );
}

// UNIFORM REGISTRATION: Makes this component available as a "composition" type
// Compositions are special components that can be used as full pages
registerUniformComponent({
  type: "page",
  component: Page,
});

export default Page;
