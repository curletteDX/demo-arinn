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
 * - Configures favicons with light/dark mode support
 *
 * Structure:
 * - Html: Root HTML element with language attribute
 * - Head: Document head (meta tags, links, etc.)
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
    <Html lang="en">
      <Head>
        {/* Favicons with light/dark mode support */}
        <link
          rel="icon"
          href="/icon-light-32x32.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/icon-dark-32x32.png"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#f5f0eb" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#3d3630" media="(prefers-color-scheme: dark)" />

        {/* Open Graph / Social sharing defaults */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Arinn" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
