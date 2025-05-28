import type { Metadata, Viewport } from "next";

import { env } from "~/env";

// const keywords = "Heightened Exposure, Heightened, Exposure, drone, drone photography, aerial photography, drone recreation, ";
export const companyTitle = "Heightened Exposure";
export const heightenedDescription =
  "Heightened Exposure, LLC is a small family owned and operated drone photography company. Inspired by the draw of seeing the world from a bird’s eye view, our goal is to enhance the experiences and businesses of our clients. ";
export const siteURL = "https://www.heightenedexpo.com/";
export const hexpoPhone = "703-856-1496";
export const themeColor = "#ffffff";

export const yearEstablished = 2022;

export const metadata: Metadata = {
  title: {
    default: companyTitle,
    template: `%s | ${companyTitle}`,
  },
  description: heightenedDescription,
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
    description: heightenedDescription,
    phoneNumbers: [hexpoPhone],
    images: [
      {
        url: siteURL + "/largelogo.png",
        type: "image/png",
        alt: "Logo",
        width: 512,
        height: 512,
      },
    ],
  },
  /**
   * @see https://realfavicongenerator.net/
   * @example npx realfavicon check <port>
   */
  icons: [
    {
      url: "/favicon-96x96.png",
      type: "image/png",
      rel: "icon",
      sizes: "96x96",
    },
    {
      url: "/favicon.svg",
      type: "image/svg+xml",
      rel: "icon",
    },
    {
      url: "/favicon.ico",
      type: "image/x-icon",
      rel: "shortcut icon",
    },
    {
      url: "/apple-touch-icon.png",
      type: "image/png",
      rel: "apple-touch-icon",
      sizes: "180x180",
    },
    {
      url: "/site.webmanifest",
      type: "application/manifest+json",
      rel: "manifest",
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
