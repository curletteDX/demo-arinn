import { createPreviewHandler } from "@uniformdev/canvas-next";

/**
 * Uniform Preview API Route - /api/preview
 * 
 * This API route enables preview mode for Uniform content authors.
 * When content authors click "Preview" in Uniform, this endpoint
 * activates Next.js preview mode and redirects to the page.
 * 
 * How Preview Mode Works:
 * 1. Content author clicks "Preview" in Uniform editor
 * 2. Uniform calls this API with preview parameters
 * 3. This handler validates the secret and enables preview mode
 * 4. User is redirected to the page with draft content visible
 * 
 * Preview vs Published:
 * - Preview: Shows draft/unpublished changes (for content authors)
 * - Published: Shows live content (for regular visitors)
 * 
 * Security:
 * - Uses UNIFORM_PREVIEW_SECRET to prevent unauthorized access
 * - Only content authors with the secret can enable preview mode
 * 
 * Configuration:
 * - resolveFullPath: Determines which page to preview
 * - secret: Validates preview requests
 * - playgroundPath: Where to go for component pattern designing
 * 
 * More info: https://nextjs.org/docs/advanced-features/preview-mode
 */
export default createPreviewHandler({
  // Determine which page to preview based on Uniform parameters
  resolveFullPath: (options) => {
    let result: string | undefined;

    // Try different path resolution strategies
    if (options.path) {
      result = options.path;        // Direct path from Uniform
    } else if (options.slug) {
      result = options.slug;        // Slug-based routing
    } else if (options.id) {
      result = options.id;          // ID-based routing
    }

    return result;
  },
  
  // Security secret - must match UNIFORM_PREVIEW_SECRET environment variable
  secret: () =>
    process.env.UNIFORM_PREVIEW_SECRET || "gavefabrikken-preview-secret",
  
  // Path to the component playground for configure individual component patterns
  playgroundPath: "/uniform-playground/pattern-playground",
});
