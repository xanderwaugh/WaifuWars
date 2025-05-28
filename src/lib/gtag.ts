import { env } from "~/env";

export const GA_TRACKING_ID = env.NEXT_PUBLIC_GA_ID;

/**
 * Function that tracks a page view event
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 * @param url URL of the page to track
 */
export const pageview = (url: string) => {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!window.gtag) return;

  // window.gtag("config", GA_TRACKING_ID, {
  //   page_path: url,
  // });
  window.gtag("event", "page_view", {
    page_path: url,
  });
};

/**
 * Function that tracks a page view event
 * @see https://nextjs.org/docs/pages/building-your-application/optimizing/analytics
 * @param metric Metric to track
 */
export const webVitals = (metric: Metric) => {
  // Use `window.gtag` if you initialized Google Analytics as this example:
  // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics
  window.gtag("event", metric.name, {
    value: Math.round(
      metric.name === "CLS" ? metric.value * 1000 : metric.value,
    ), // values must be integers
    event_label: metric.id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  });
};

export const voteEvent = (selected: number, against: number) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "vote", {
      event_label: "vote",
      event_category: "waifu",
      votedFor: selected,
      votedAgainst: against,
    });
  }
};
