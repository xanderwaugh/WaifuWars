"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { usePostHog } from "posthog-js/react";

import { getBaseUrl } from "~/lib";
import { pageview, webVitals } from "~/lib/gtag";

const PostHogPageView: React.FC = () => {
  const posthog = usePostHog();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useReportWebVitals((metric: Metric) => {
    // if(env.NODE_ENV === "development") console.log("[WEB VITALS]:", metric);
    webVitals(metric);
  });

  // * Track pageviews (PostHog)
  useEffect(() => {
    if (!pathname) return;

    let url = window.origin + pathname;
    if (searchParams.toString()) {
      url = url + `?${searchParams.toString()}`;
    }

    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams, posthog]);

  // * Track pageviews (Google Analytics)
  useEffect(() => {
    if (!pathname) return;

    let url = getBaseUrl() + pathname;
    if (searchParams.toString()) {
      url = url + `?${searchParams.toString()}`;
    }

    pageview(url);
  }, [pathname, searchParams]);

  return null;
};

export { PostHogPageView };
export default PostHogPageView;
