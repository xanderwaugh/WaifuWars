import type { NextConfig } from "next";

import "./src/env";

const config: NextConfig = {
// * Config
  reactStrictMode: true,
  poweredByHeader: false,
  generateEtags: false,
  // swcMinify: true,
  trailingSlash: true,
  cleanDistDir: true,
  reactCompiler: true,

  // * NextJS Images
  images: {
    remotePatterns: [
      { hostname: "waifuwars.net" },
      { hostname: "cdn.discordapp.com" },
      { hostname: "source.unsplash.com" },
      { hostname: "myanimelist.net" },
      { hostname: "cdn.myanimelist.net" },
      { hostname: "s4.anilist.co" },
      { hostname: "waifuwars.s3.amazonaws.com" },
      { hostname: "drhf1g4gb8ywl.cloudfront.net" },
    ],
    formats: ["image/avif", "image/webp"],
  },

 /**
   * * Optimize Package Imports
   * @see https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
   */
  experimental: {
    // typedRoutes: true,
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "hls.js",
      "date-fns",
      "@radix-ui/react-icons",
      "motion",
      "superjson",
    ],
  },

  // * Skip ESLint and TypeScript checks on build
  typescript: { ignoreBuildErrors: true },

  /**
   * Posthog Rewrites
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  rewrites: async () => [
    {
      source: "/ingest/static/:path*",
      destination: "https://us-assets.i.posthog.com/static/:path*",
    },
    {
      source: "/ingest/:path*",
      destination: "https://us.i.posthog.com/:path*",
    },
    {
      source: "/ingest/decide",
      destination: "https://us.i.posthog.com/decide",
    },
  ],
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default config;
