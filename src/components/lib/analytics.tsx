"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { GoogleAnalytics } from "@next/third-parties/google";
import { posthog } from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { env } from "~/env";
import { GA_TRACKING_ID } from "~/lib/gtag";

const SuspendedPostHogPageView = dynamic(() => import("./pageview-tracker"), {
  ssr: false,
});

const Analytics: React.FC<RootLayoutProps> = ({ children }) => {
  useEffect(() => {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true,
    });
  }, []);

  if (env.NODE_ENV !== "production") return children;

  return (
    <PostHogProvider client={posthog}>
      <SuspendedPostHogPageView />
      <GoogleAnalytics gaId={GA_TRACKING_ID} />
      {children}
    </PostHogProvider>
  );
};

export { Analytics };
export default Analytics;
