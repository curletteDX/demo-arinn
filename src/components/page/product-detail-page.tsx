// Uniform imports for creating page layouts
import {
  registerUniformComponent,
  UniformSlot,
} from "@uniformdev/canvas-react";
// Import all components to make them available to Uniform
import "@/components";

/**
 * ProductDetailPage Component - Product Detail Layout Template
 *
 * A specialized page layout for product detail pages (PDP) that follows
 * e-commerce best practices with a two-column layout for gallery and info.
 *
 * Layout Structure:
 * ┌─────────────────────────────────────────┐
 * │               Header                    │
 * ├────────────────────┬────────────────────┤
 * │                    │                    │
 * │  Product Gallery   │   Product Info     │
 * │    (images)        │   (details/buy)    │
 * │                    │                    │
 * ├────────────────────┴────────────────────┤
 * │          Related Products               │
 * ├─────────────────────────────────────────┤
 * │               Footer                    │
 * └─────────────────────────────────────────┘
 *
 * Key Features:
 * - Two-column layout for gallery + info on desktop
 * - Stacked layout on mobile
 * - Dedicated slots for product-specific components
 * - Warm furniture e-commerce styling (bg-[#FAF9F7])
 */
function ProductDetailPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7]">
      {/* HEADER SLOT */}
      <UniformSlot name="header" />

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full">
        {/* Product Detail Section - Two Column Layout */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Gallery Slot */}
            <div>
              <UniformSlot name="productGallery" />
            </div>

            {/* Product Info Slot */}
            <div>
              <UniformSlot name="productInfo" />
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <UniformSlot name="relatedProducts" />
      </main>

      {/* FOOTER SLOT */}
      <UniformSlot name="footer" />
    </div>
  );
}

// UNIFORM REGISTRATION: Makes this component available as a "productDetailPage" composition type
registerUniformComponent({
  type: "productDetailPage",
  component: ProductDetailPage,
});

export default ProductDetailPage;
