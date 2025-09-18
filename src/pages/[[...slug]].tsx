// Uniform imports for handling dynamic routing and content fetching
import { prependLocale, withUniformGetServerSideProps } from "@uniformdev/canvas-next/route";
import {
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
} from "@uniformdev/canvas";

import PageComposition from "@/components/page/page-composition";

/**
 * Dynamic Route Handler - [[...slug]].tsx
 * 
 * This is the "catch-all" route that handles all pages managed by Uniform CMS.
 * The filename [[...slug]].tsx means it catches any URL path and tries to find
 * a matching composition in Uniform.
 * 
 * How it works:
 * 1. User visits any URL (e.g., /about, /products/shoes, /blog/article-1)
 * 2. Next.js calls getServerSideProps with the URL path
 * 3. withUniformGetServerSideProps fetches composition data from Uniform
 * 4. If found, renders the composition; if not, shows 404
 * 
 * Key Features:
 * - Dynamic routing (any URL can be a page)
 * - Preview mode support (draft vs published content)
 * - Internationalization support (multiple languages)
 * - Error handling for missing pages
 * 
 * This enables content authors to create pages in Uniform without developers
 * needing to create new route files.
 */

export const getServerSideProps = withUniformGetServerSideProps({
  // Configure how to fetch content from Uniform
  requestOptions: (context) => {
    return ({
      // Use draft content in preview mode, published content otherwise
      state: Boolean(context.preview)
        ? CANVAS_DRAFT_STATE  // Shows unpublished changes for content authors
        : CANVAS_PUBLISHED_STATE, // Shows live content for regular visitors
    });
  },
  
  // Handle internationalization (i18n) - prepend locale to path if needed
  modifyPath: (path, context) => {
    const resultingPath = prependLocale(path, context);
    return resultingPath;
  },
  
  // Process the composition data before sending to component
  handleComposition: async (routeResponse, _context) => {
    const { composition, errors } = routeResponse.compositionApiResponse || {};

    // Log any data errors for debugging
    if (errors?.some((e) => e.type === "data")) {
      console.log("errors", errors);      
    }

    const preview = Boolean(_context.preview);

    // Return props that will be passed to the PageComposition component
    return {
      props: { preview, data: composition || null },
    };
  },
});

// Export the PageComposition component as the default export
// This component will receive the composition data and render it
export default PageComposition;
