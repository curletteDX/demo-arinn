import { imageFrom } from "@uniformdev/assets";
import type { Asset } from "@uniformdev/assets";

// Type that imageFrom accepts (first parameter)
type ImageFromAsset = Parameters<typeof imageFrom>[0];

/**
 * Image transformation options
 */
export interface TransformOptions {
  /** Target width in pixels */
  width: number;
  /** Target height in pixels (optional) */
  height?: number;
  /** Resize mode */
  fit?: "cover" | "contain" | "scale-down";
  /** Focal point for cropping */
  focal?: { x: number; y: number } | "center" | "auto";
  /** Image quality (1-100) */
  quality?: number;
  /** Device pixel ratio */
  dpr?: number;
}

/**
 * Get a transformed image URL from a Uniform asset or external image source.
 * Supports multiple CDNs: Uniform Assets, Cloudinary, Unsplash.
 *
 * @param asset - The Uniform asset object (or undefined)
 * @param options - Transformation options
 * @returns Transformed image URL or undefined if no asset
 *
 * @example
 * ```ts
 * const imageUrl = getTransformedImageUrl(firstAsset, {
 *   width: 800,
 *   height: 600,
 *   fit: "cover",
 *   focal: focalPoint || "center",
 *   quality: 85,
 * });
 * ```
 */
export function getTransformedImageUrl(
  asset: Asset | ImageFromAsset | undefined,
  options: TransformOptions
): string | undefined {
  if (!asset) return undefined;

  // Handle string URLs
  if (typeof asset === "string") {
    return asset;
  }

  const { width, height, fit = "cover", focal = "center" } = options;

  // Try to use imageFrom for Uniform assets first
  try {
    // Check if this looks like a Uniform asset by trying imageFrom
    const baseUrl = imageFrom(asset).url();
    
    if (baseUrl && (baseUrl.includes("uniform.global") || baseUrl.includes("uniformcdn"))) {
      let transform = imageFrom(asset).transform({ width });

      if (height) {
        transform = imageFrom(asset).transform({ width, height, fit, focal });
      }

      return transform.url();
    }
  } catch {
    // Not a Uniform asset or imageFrom failed, continue to other methods
  }

  // Get the source URL from asset properties
  const assetObj = asset as Record<string, unknown>;
  const sourceUrl = (assetObj?.url as string | undefined) || 
                   ((assetObj?.fields as Record<string, unknown>)?.url as { value?: string } | undefined)?.value ||
                   ((assetObj?.fields as Record<string, unknown>)?.file as { value?: { url?: string } } | undefined)?.value?.url;
  if (!sourceUrl || typeof sourceUrl !== "string") return undefined;

  // Check if this is a Cloudinary URL
  if (sourceUrl.includes("res.cloudinary.com")) {
    return transformCloudinaryUrl(sourceUrl, options);
  }

  // Check if this is an Unsplash URL
  if (sourceUrl.includes("images.unsplash.com")) {
    return transformUnsplashUrl(sourceUrl, options);
  }

  // For other URLs, return as-is or with basic query params
  return sourceUrl;
}

/**
 * Transform a Cloudinary URL with the specified options
 */
function transformCloudinaryUrl(url: string, options: TransformOptions): string {
  const { width, height, fit = "cover", focal, quality = 85 } = options;

  // Build transformation string
  const transforms: string[] = [];

  transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  transforms.push(`q_${quality}`);

  // Map fit to Cloudinary crop mode
  const cropMap: Record<string, string> = {
    cover: "fill",
    contain: "fit",
    "scale-down": "limit",
  };
  transforms.push(`c_${cropMap[fit] || "fill"}`);

  // Handle focal point
  if (focal && typeof focal === "object") {
    transforms.push(`g_xy_center`);
    transforms.push(`x_${Math.round(focal.x * 100)}`);
    transforms.push(`y_${Math.round(focal.y * 100)}`);
  } else if (focal === "auto") {
    transforms.push("g_auto");
  }

  // Auto format for best compression
  transforms.push("f_auto");

  // Insert transforms into URL
  const transformString = transforms.join(",");

  // Cloudinary URL pattern: .../upload/[transforms]/...
  return url.replace("/upload/", `/upload/${transformString}/`);
}

/**
 * Transform an Unsplash URL with the specified options
 */
function transformUnsplashUrl(url: string, options: TransformOptions): string {
  const { width, height, fit = "cover", focal, quality = 85 } = options;

  const params = new URLSearchParams();
  params.set("w", String(width));
  if (height) params.set("h", String(height));
  params.set("q", String(quality));

  // Map fit to Unsplash/Imgix fit mode
  const fitMap: Record<string, string> = {
    cover: "crop",
    contain: "fit",
    "scale-down": "max",
  };
  params.set("fit", fitMap[fit] || "crop");

  // Handle focal point
  if (focal && typeof focal === "object") {
    params.set("crop", "focalpoint");
    params.set("fp-x", String(focal.x));
    params.set("fp-y", String(focal.y));
  }

  // Auto format
  params.set("auto", "format");

  // Build URL with params
  const baseUrl = url.split("?")[0];
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Get the alt text from an asset's metadata
 */
export function getAssetAltText(asset: Asset | ImageFromAsset | undefined, fallback = "Image"): string {
  if (!asset || typeof asset === "string") return fallback;

  const assetObj = asset as Record<string, unknown>;
  const fields = assetObj?.fields as Record<string, { value?: string }> | undefined;

  return (
    fields?.description?.value ||
    fields?.title?.value ||
    (assetObj?.title as string | undefined) ||
    fallback
  );
}

/**
 * Get the focal point from an asset's metadata
 */
export function getAssetFocalPoint(
  asset: Asset | ImageFromAsset | undefined
): { x: number; y: number } | undefined {
  if (!asset || typeof asset === "string") return undefined;

  const assetObj = asset as Record<string, unknown>;
  const fields = assetObj?.fields as Record<string, { value?: unknown }> | undefined;
  const focalPoint = fields?.focalPoint?.value;
  
  if (focalPoint && typeof focalPoint === "object" && "x" in focalPoint && "y" in focalPoint) {
    return focalPoint as { x: number; y: number };
  }

  return undefined;
}

