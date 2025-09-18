// Uniform SDK imports for different client types
import { CANVAS_PUBLISHED_STATE, CANVAS_DRAFT_STATE, RouteClient, ContentClient } from '@uniformdev/canvas';
import { ProjectMapClient } from '@uniformdev/project-map';
import { ManifestClient } from '@uniformdev/context/api';

/**
 * Uniform Canvas Client Factory Functions
 * 
 * This file provides factory functions for creating different types of Uniform clients.
 * Each client serves a specific purpose in the Uniform ecosystem and requires proper
 * environment variable configuration.
 * 
 * Required Environment Variables:
 * - UNIFORM_API_KEY: Authentication key for Uniform API
 * - UNIFORM_PROJECT_ID: Unique identifier for your Uniform project
 * - UNIFORM_CLI_BASE_URL: Uniform API base URL (defaults to uniform.app)
 * - UNIFORM_CLI_BASE_EDGE_URL: Uniform Edge API URL (defaults to uniform.global)
 * 
 * Client Types:
 * - ContentClient: For accessing compositions and content
 * - RouteClient: For dynamic routing and URL resolution  
 * - ProjectMapClient: For project structure and navigation
 * - ManifestClient: For context and personalization manifests
 */

/**
 * Content Client Factory - Compositions and Content Management
 * 
 * The ContentClient is used to fetch compositions (pages) and other content
 * from Uniform. It supports both published and draft content states.
 * 
 * Use Cases:
 * - Fetching page compositions for rendering
 * - Accessing draft content in preview mode
 * - Content management operations
 * 
 * Network:
 * - Uses both API host (for management) and Edge host (for fast content delivery)
 */
export const getContentClient = () => {
	// Extract environment variables with validation
	const apiKey = process.env.UNIFORM_API_KEY;
	const apiHost = process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app';
	const edgeApiHost = process.env.UNIFORM_CLI_BASE_EDGE_URL || 'https://uniform.global';
	const projectId = process.env.UNIFORM_PROJECT_ID;

	// Validate required configuration
	if (!apiKey) throw new Error('apiKey is not specified. ContentClient cannot be instantiated');
	if (!apiHost) throw new Error('apiHost is not specified. ContentClient cannot be instantiated');
	if (!edgeApiHost) throw new Error('edgeApiHost is not specified. ContentClient cannot be instantiated');
	if (!projectId) throw new Error('projectId is not specified. ContentClient cannot be instantiated.');

	return new ContentClient({
		apiKey,
		apiHost,
		projectId,
		edgeApiHost,
	});
};

/**
 * Manifest Client Factory - Context and Personalization
 * 
 * The ManifestClient handles context manifests used for personalization
 * and visitor tracking. It manages audience segments, signals, and
 * personalization rules.
 * 
 * Use Cases:
 * - Loading personalization manifests
 * - Managing visitor context and signals
 * - A/B testing and personalization rules
 * 
 * Network:
 * - Uses main API host for manifest operations
 */
export const getManifestClient = () => {
	const apiKey = process.env.UNIFORM_API_KEY;
	const apiHost = process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app';
	const projectId = process.env.UNIFORM_PROJECT_ID;

	// Validate required configuration
	if (!apiKey) throw new Error('apiKey is not specified. ManifestClient cannot be instantiated');
	if (!apiHost) throw new Error('apiHost is not specified. ManifestClient cannot be instantiated');
	if (!projectId) throw new Error('projectId is not specified. ManifestClient cannot be instantiated.');

	return new ManifestClient({
		apiKey,
		apiHost,
		projectId,
	});
};

/**
 * Route Client Factory - Dynamic Routing and URL Resolution
 * 
 * The RouteClient handles dynamic routing by resolving URL paths to
 * specific compositions. This enables the [[...slug]].tsx catch-all
 * route to work with Uniform's content management.
 * 
 * Use Cases:
 * - Resolving URLs to composition data
 * - Dynamic routing for CMS-managed pages
 * - URL-based content fetching
 * 
 * Configuration:
 * - disableSWR: Disables stale-while-revalidate caching for server-side use
 * - Uses Edge API for fast global content delivery
 */
export const getRouteClient = () => {
	const apiKey = process.env.UNIFORM_API_KEY;
	const edgeApiHost = process.env.UNIFORM_CLI_BASE_EDGE_URL || 'https://uniform.global';
	const projectId = process.env.UNIFORM_PROJECT_ID;

	// Validate required configuration
	if (!apiKey) {
		throw new Error('apiKey is not specified. RouteClient cannot be instantiated: ' + apiKey);
	}
	if (!edgeApiHost) throw new Error('edgeApiHost is not specified. RouteClient cannot be instantiated');
	if (!projectId) throw new Error('projectId is not specified. RouteClient cannot be instantiated.');

	const client = new RouteClient({
		apiKey,
		projectId,
		edgeApiHost,
		disableSWR: true, // Disable caching for server-side rendering
	});

	return client;
};

/**
 * Project Map Client Factory - Site Structure and Navigation
 * 
 * The ProjectMapClient manages the overall site structure, including
 * navigation hierarchies, URL patterns, and site organization.
 * 
 * Use Cases:
 * - Managing site navigation structure
 * - URL pattern configuration
 * - Site hierarchy and organization
 * - Multi-site management
 * 
 * Network:
 * - Uses main API host for project map operations
 */
export const getProjectMapClient = () => {
	const apiKey = process.env.UNIFORM_API_KEY;
	const apiHost = process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app';
	const projectId = process.env.UNIFORM_PROJECT_ID;

	// Validate required configuration
	if (!apiHost) throw new Error('apiHost is not specified. Project Map client cannot be instantiated');
	if (!projectId) throw new Error('projectId is not specified. Project Map client cannot be instantiated');

	return new ProjectMapClient({
		apiKey,
		apiHost,
		projectId,
	});
};

/**
 * Content State Helper - Determine Draft vs Published State
 * 
 * This utility function determines whether to fetch draft or published content
 * based on the environment and preview mode status.
 * 
 * Logic:
 * - Development: Always use draft state (for easier development)
 * - Preview mode: Use draft state (for content authors)
 * - Production: Use published state (for live visitors)
 * 
 * @param preview - Whether preview mode is active
 * @returns Uniform content state constant
 */
export const getState = (preview: boolean | undefined) =>
	process.env.NODE_ENV === 'development' || preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE;