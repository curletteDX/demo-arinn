import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      /*
      // Uniform assets
      { protocol: "https", hostname: "*.uniform.global" },

      // Cloudinary
      // Note: you can restrict to your cloud name in pathname if you want
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },

      // Shopify CDN
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/**" },

      // Contentful images
      { protocol: "https", hostname: "images.ctfassets.net", pathname: "/**" },

      // Bynder (standard CDN domains)
      { protocol: "https", hostname: "bynder.com", pathname: "/**" }, // top-level
      { protocol: "https", hostname: "*.bynder.com", pathname: "/**" }, // your tenant subdomain(s)
      { protocol: "https", hostname: "cdn.bynder.io", pathname: "/**" },

      // Scaleflex / Filerobot
      { protocol: "https", hostname: "*.scaleflexcdn.net", pathname: "/**" },
      { protocol: "https", hostname: "cdn.filerobot.com", pathname: "/**" },
      */
    ],
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
};

export default nextConfig;
