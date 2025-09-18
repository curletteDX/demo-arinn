import { Html, Head, Main, NextScript } from "next/document";

/**
 * Next.js Document Component - HTML Document Structure
 * 
 * This component defines the overall HTML document structure that wraps
 * every page. It's only rendered on the server side and is used to
 * customize the <html> and <body> tags.
 * 
 * Key Features:
 * - Sets document language to English
 * - Adds font antialiasing for smoother text rendering
 * - Provides the basic HTML document shell
 * 
 * Structure:
 * - Html: Root HTML element with language attribute
 * - Head: Document head (meta tags, links, etc. can be added here)
 * - Body: Document body with antialiasing class
 * - Main: Where the page content is injected
 * - NextScript: Next.js client-side scripts
 * 
 * Note: This component only runs on the server and is not suitable for
 * event handlers, CSS-in-JS, or other client-side functionality.
 * Use _app.tsx for client-side global functionality.
 */
export default function Document() {
  return (
    <Html lang="en"> {/* Document language for accessibility and SEO */}
      <Head /> {/* Document head - meta tags, favicons, etc. */}
      <body className="antialiased"> {/* Smooth font rendering */}
        <Main /> {/* Page content injection point */}
        <NextScript /> {/* Next.js runtime scripts */}
      </body>
    </Html>
  );
}
