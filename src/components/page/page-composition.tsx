// Uniform imports for rendering compositions from the CMS
import { UniformComposition } from "@uniformdev/canvas-react";
import {
  RootComponentInstance,
} from "@uniformdev/canvas";
// Import the page component registration
import "@/components/page/page";
import { useSetViewportQuirk } from "@/hooks/useSetViewportQuirk";

/**
 * Page Composition Renderer
 * 
 * This component is responsible for rendering Uniform compositions (pages) on the frontend.
 * It receives composition data from Uniform and converts it into React components.
 * 
 * How it works:
 * 1. Next.js catches all routes with [[...slug]].tsx
 * 2. getServerSideProps fetches composition data from Uniform
 * 3. This component renders the composition using UniformComposition
 * 4. UniformComposition matches component types to registered React components
 * 
 * Props:
 * - data: The composition structure from Uniform (components, content, etc.)
 */
export default function Page({ data }: { data: RootComponentInstance }) {  
    // Hook to allow viewport size to be used by Visbility Rules inside the Uniform Canvas editor
    useSetViewportQuirk();
  
    // UNIFORM RENDERER: This takes the composition data and renders it as React components
    // behaviorTracking="onLoad" enables analytics tracking when the page loads
    return <UniformComposition data={data} behaviorTracking="onLoad"></UniformComposition>;
}
