// Uniform Context SDK imports for personalization and visitor tracking
import {
    Context,
    ManifestV2,
    ContextPlugin,
    enableDebugConsoleLogDrain,
    enableContextDevTools,
  } from "@uniformdev/context";
  import { NextCookieTransitionDataStore } from "@uniformdev/context-next";
  import { NextPageContext } from "next";
  import manifest from "./contextManifest.json"; // Personalization manifest
  
  /**
   * Uniform Context Factory - Personalization and Visitor Tracking
   * 
   * This function creates a Uniform Context instance that handles visitor
   * tracking, personalization, and audience segmentation. The context tracks
   * visitor behavior and enables personalized content delivery.
   * 
   * Key Features:
   * - Visitor behavior tracking
   * - Audience segmentation
   * - Personalization rules
   * - A/B testing support
   * - Cross-session visitor identification
   * 
   * Context Manifest:
   * - Defines signals (visitor actions/attributes)
   * - Configures audience segments
   * - Sets up personalization rules
   * - Stored in contextManifest.json
   * 
   * Cookie Storage:
   * - Uses cookies to persist visitor context across sessions
   * - 30-minute session expiration
   * - GDPR-compliant with consent management
   * 
   * Development Tools:
   * - Context DevTools: Browser extension for debugging
   * - Console logging: Debug output for development
   * 
   * @param serverContext - Next.js server context for SSR cookie access
   * @returns Configured Uniform Context instance
   */
  export default function createUniformContext(
    serverContext?: NextPageContext
  ): Context {
    // Session configuration: 30 minutes (1800 seconds)
    const sessionExpirationInSeconds = 1800;
    const secondsInDay = 60 * 60 * 24;
    const expires = sessionExpirationInSeconds / secondsInDay; // Convert to days for cookie expiration
    
    // Development and debugging plugins
    const plugins: ContextPlugin[] = [
      enableContextDevTools(), // Browser DevTools integration
      enableDebugConsoleLogDrain("debug"), // Console logging for debugging
    ];
    
    const context = new Context({
      defaultConsent: true, // GDPR: Default consent for tracking (adjust for your compliance needs)
      manifest: manifest as ManifestV2, // Personalization rules and audience definitions
      transitionStore: new NextCookieTransitionDataStore({
        serverContext, // Enable server-side cookie access for SSR
        cookieAttributes: {
          expires, // Cookie expiration time
        },
      }),
      plugins: plugins,
      visitLifespan: sessionExpirationInSeconds * 1000, // Convert to milliseconds
    });
    
    return context;
  }
