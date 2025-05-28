import type { Metadata, Viewport } from "next";

import { env } from "~/env";

const companyTitle = "Waifu Wars";
const seoDescription = "Vote for the best waifu!";
// ! WaifuWars.net WaifuWars.dev waifu.xanny.dev
export const siteURL = "https://waifuwars.net/"; // "https://waifu.xanny.dev/";
export const themeColor = "#262626";

export const metadata: Metadata = {
  title: {
    default: companyTitle,
    template: `%s | ${companyTitle}`,
  },
  description: seoDescription,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: companyTitle,
  },
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": "large",
  },
  twitter: {
    card: "summary_large_image",
    site: siteURL,
  },
  alternates: { canonical: siteURL },
  // * MetadataBase
  metadataBase: new URL(
    env.NODE_ENV === "production"
      ? siteURL // SEOConfig.siteUrl
      : "http://localhost:3000",
  ),

  // * Open Graph
  openGraph: {
    url: siteURL,
    title: companyTitle,
    siteName: companyTitle,
    locale: "en_US",
    type: "website",
    description: seoDescription,
    phoneNumbers: [],
    images: [
      {
        url: siteURL + "android-chrome-512x512.png",
        alt: "Logo",
        width: 512,
        height: 512,
        type: "image/png",
      },
      {
        url: siteURL + "android-chrome-192x192.png",
        alt: "Logo",
        width: 192,
        height: 192,
        type: "image/png",
      },
      {
        url: siteURL + "SquareLogo.png",
        alt: "Logo",
        width: 512,
        height: 512,
        type: "image/png",
      },
      {
        url: siteURL + "preview.mp4",
        alt: "Preview",
        width: 1280,
        height: 720,
        type: "video/mp4",
      },
    ],
  },

  /**
   * @see https://realfavicongenerator.net/
   * @example npx realfavicon check <port>
   */
  icons: [
    {
      url: siteURL + "favicon.ico",
      type: "image/x-icon",
      rel: "icon",
      sizes: "48x48",
    },
    {
      url: siteURL + "favicon-32x32.png",
      type: "image/png",
      sizes: "32x32",
      rel: "icon",
    },
    {
      url: siteURL + "favicon-16x16.png",
      type: "image/png",
      sizes: "16x16",
      rel: "icon",
    },
    {
      url: siteURL + "android-chrome-512x512.png",
      type: "image/png",
      sizes: "512x512",
      rel: "icon",
    },
    {
      url: siteURL + "android-chrome-192x192.png",
      type: "image/png",
      sizes: "192x192",
      rel: "icon",
    },
    {
      url: siteURL + "SquareLogo.png",
      type: "image/png",
      sizes: "512x512",
      rel: "icon",
    },
    {
      url: siteURL + "preview.mp4",
      type: "video/mp4",
      sizes: "1280x720",
      rel: "icon",
    },
    // mask-icon
    {
      url: siteURL + "safari-pinned-tab.svg",
      sizes: "48x48",
      color: themeColor,
      rel: "mask-icon",
    },
    // apple-touch-icon
    {
      url: siteURL + "apple-touch-icon.png",
      sizes: "180x180",
      rel: "apple-touch-icon",
    },
  ],
};

export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
  themeColor: themeColor,
  // * Disable auto-zoom on mobile Safari, credit to https://github.com/ai-ng
  maximumScale: 1,
} as const;
