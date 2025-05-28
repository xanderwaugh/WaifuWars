import "./globals.css";

import type { NextWebVitalsMetric } from "next/app";
import { Suspense } from "react";
import { Montserrat, Source_Code_Pro } from "next/font/google";

import { Providers } from "~/components/lib/next-providers";
import { TWIndicator } from "~/components/lib/tw-indicator";
import { cn } from "~/lib/tw";

const mont = Montserrat({
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const scp = Source_Code_Pro({
  variable: "--font-scp",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
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
          {/* <CookieBanner /> */}
          <TWIndicator />
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;

export { metadata, viewport } from "~/lib/metadata";

export function reportWebVitals(props: NextWebVitalsMetric) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
