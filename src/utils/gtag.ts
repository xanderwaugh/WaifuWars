"use client";
import "client-only";
import { env } from "~/env.mjs";

export const GA_TRACKING_ID = env.NEXT_PUBLIC_GA_ID;
// "G-PNL6BCD0QW";

/**
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 */
export const pageview = (url: string) => {
  if (typeof window !== "undefined") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

interface EventProps {
  action: Gtag.EventNames;
  category: string | undefined;
  label: string | undefined;
  value: number | undefined;
}

/**
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/events
 */
export const event = ({ action, category, label, value }: EventProps) => {
  if (typeof window !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const voteEvent = (selected: number, against: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "vote", {
      event_label: "vote",
      event_category: "waifu",
      votedFor: selected,
      votedAgainst: against,
    });
  }
};
