/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

const isDev = process.env.NODE_ENV !== "production";

/** @type {import("next").NextConfig} */
const config = {
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
  // * Config
  reactStrictMode: true,
  poweredByHeader: false,
  generateEtags: false,
  // swcMinify: true,
  cleanDistDir: true,
  trailingSlash: true,

  experimental: {
    reactCompiler: true,
  },

  /**
   * If you have the "appDir" setting enabled, then you
   * must comment the below `i18n` config out.
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: { locales: ["en"], defaultLocale: "en" },
};

export default config;
