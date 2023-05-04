/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: { locales: ["en"], defaultLocale: "en" },
  images: {
    domains: [
      "cdn.discordapp.com",
      "source.unsplash.com",
      //
      "myanimelist.net",
      "cdn.myanimelist.net",
    ],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  generateEtags: false,
  swcMinify: true,
  trailingSlash: true,
  cleanDistDir: true,
};

export default config;
