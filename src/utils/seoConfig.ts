import { type NextSeoProps } from "next-seo/lib/types";

const companyTitle = "Waifu Wars";
const seoDescription = "Vote for the best waifu!";
// ! WaifuWars.net WaifuWars.dev waifu.xanny.dev
const siteURL = "https://waifu.xanny.dev/";
const themeColor = "#262626";

export const SEOConfig: NextSeoProps = {
  canonical: siteURL,
  defaultTitle: companyTitle,
  description: seoDescription,

  openGraph: {
    url: siteURL,
    title: companyTitle,
    site_name: companyTitle,
    locale: "en_US",
    type: "website",
    description: seoDescription,
    images: [
      // { url: "https://bebop.xanny.dev/assets/hero.svg",  alt: "Logo", width: 512, height: 512, type: "image/svg" },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
    site: siteURL,
  },
  additionalMetaTags: [
    { httpEquiv: "x-ua-compatible", content: "IE=edge" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    { name: "HandheldFriendly", content: "true" },
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    { name: "application-name", content: companyTitle },
    { name: "msapplication-TileColor", content: themeColor },
    { name: "theme-color", content: themeColor },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "default",
    },
    {
      name: "apple-mobile-web-app-title",
      content: companyTitle,
    },
    {
      name: "apple-mobile-web-app-status-bar",
      content: themeColor,
    },
    {
      name: "format-detection",
      content: "telephone=no",
    },
    {
      name: "mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "msapplication-config",
      content: "/browserconfig.xml",
    },
  ],
  additionalLinkTags: [
    // { rel: "manifest",  href: "/manifest.json" },
    // { rel: "icon", sizes: "48x48", href: "/favicon.ico" },
    { rel: "icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    {
      rel: "shortcut icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "mask-icon",
      href: "/safari-pinned-tab.svg",
      color: themeColor,
    },
  ],
};
