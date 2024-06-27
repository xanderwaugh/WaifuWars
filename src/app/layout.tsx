import "~/styles/globals.css";
import { Suspense } from "react";
import type { Metadata } from "next";
import type { NextWebVitalsMetric } from "next/app";

import { cn } from "~/utils/tw";
import { Montserrat, Source_Code_Pro } from "next/font/google";

import { Providers, Analytics, TWIndicator } from "~/components/Utils";

const mont = Montserrat({
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const scp = Source_Code_Pro({
  display: "swap",
  variable: "--font-scp",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-primary antialiased",
          mont.variable,
          scp.variable,
        )}
      >
        <Providers>
          <main className="mr-2">{children}</main>
        </Providers>

        <Suspense fallback={null}>
          <Analytics />
          <TWIndicator />
        </Suspense>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Waifu Wars",
  description: "Vote for the best waifu!",
  // image: "/assets/og-image.png",
};

export function reportWebVitals(props: NextWebVitalsMetric) {
  if (typeof window === "undefined" || !window?.gtag) return;
  const { id, name, label, value } = props;
  window.gtag("event", name, {
    event_category:
      label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value),
    event_label: id,
    non_interaction: true,
  });
}
