import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Uniform Preview API Route - /api/preview
 *
 * This API route enables preview mode for Uniform content authors.
 * When content authors click "Preview" in Uniform, this endpoint
 * activates Next.js preview mode and redirects to the page.
 *
 * More info: https://nextjs.org/docs/advanced-features/preview-mode
 */

// Use require to avoid ESM/CommonJS interop issues
const { createPreviewHandler } = require("@uniformdev/canvas-next");

export default createPreviewHandler({
  // Determine which page to preview based on Uniform parameters
  resolveFullPath: (options: any) => {
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
    process.env.UNIFORM_PREVIEW_SECRET || "light-starter",

  // Path to the component playground for configure individual component patterns
  playgroundPath: "/uniform-playground/pattern-playground",
});
