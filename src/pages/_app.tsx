// Global styles and application setup
import "@/styles/globals.css";
import Head from 'next/head'; // Next.js head management
import { Outfit, JetBrains_Mono } from "next/font/google"; // Google Fonts
import createUniformContext from "@/uniformContext/context"; // Uniform context creation
import { UniformAppProps } from "@uniformdev/context-next"; // Uniform Next.js integration
import { UniformContext } from "@uniformdev/context-react"; // Uniform React context
import { MobileMenuProvider } from "@/contexts/MobileMenuContext"; // Mobile navigation state
import type { RootComponentInstance } from '@uniformdev/canvas'; // Uniform composition types

/**
 * Font Configuration - Google Fonts Setup
 * 
 * Using Next.js font optimization for better performance:
 * - Outfit: Main UI font (clean, modern sans-serif)
 * - JetBrains Mono: Code/monospace font (for technical content)
 * 
 * CSS Variables:
 * - --font-outfit: Available in CSS as var(--font-outfit)
 * - --font-jetbrains-mono: Available in CSS as var(--font-jetbrains-mono)
 */
const outfit = Outfit({
  subsets: ["latin"], // Character subset to load
  variable: "--font-outfit", // CSS variable name
  weight: ["300", "400", "500", "600", "700", "800"], // Available font weights
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

// Create Uniform context for client-side operations
const clientContext = createUniformContext();

/**
 * Next.js App Component - Application Root
 * 
 * This is the root component that wraps every page in the application.
 * It sets up global providers, fonts, metadata, and Uniform context.
 * 
 * Key Responsibilities:
 * - Global CSS injection
 * - SEO metadata management (title, description, keywords)
 * - Font loading and CSS variable setup  
 * - Uniform context provider setup
 * - Mobile menu state management
 * - Server/client context handling
 * 
 * Metadata Handling:
 * - Extracts page metadata from Uniform composition parameters
 * - Sets HTML title, meta description, and keywords
 * - Provides fallback values for better SEO
 * 
 * Provider Hierarchy:
 * 1. MobileMenuProvider: Mobile navigation state
 * 2. UniformContext: Uniform CMS context and personalization
 * 3. Font variables: CSS custom properties for fonts
 */
export default function App({
  Component, // The page component being rendered
  pageProps, // Props passed to the page component
  serverUniformContext, // Uniform context from server-side
}: UniformAppProps<{ data: RootComponentInstance }>) {
  const outputType = "standard"; // Uniform output type for rendering
  
  // Extract composition data for metadata
  const { data: composition } = pageProps || {};
  const { pageTitle, pageMetaDescription, pageKeywords } = composition?.parameters || {};
  
  // Extract metadata values with fallbacks
  const title = (pageTitle?.value as string) || 'Uniform Next.js Starter';
  const description = (pageMetaDescription?.value as string) || 'A clean, elegant Next.js starter project integrated with Uniform headless CMS';
  const keywords = (pageKeywords?.value as string) || 'uniform, cms, nextjs, headless, content management';

  return (
    <>
      {/* HTML Head - SEO and Metadata */}
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Application Providers and Layout */}
      <MobileMenuProvider>
        <UniformContext
          context={serverUniformContext ?? clientContext}
          outputType={outputType}
        >
          {/* Font CSS variables wrapper */}
          <div className={`${outfit.variable} ${jetbrainsMono.variable}`}>
            {/* Render the current page component */}
            <Component {...pageProps} />
          </div>
        </UniformContext>
      </MobileMenuProvider>
    </>
  );
}
