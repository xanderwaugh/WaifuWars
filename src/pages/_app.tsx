import "~/styles/globals.css";
import { type AppType, type NextWebVitalsMetric } from "next/app";

import { DefaultSeo } from "next-seo";
import { SEOConfig } from "~/utils/seoConfig";

import { api } from "~/utils/api";
import { WaifuProvider } from "~/utils/Context";

import { Montserrat } from "next/font/google";
import Analytics from "~/components/Analytics";

const mont = Montserrat({
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={mont.className}>
      <DefaultSeo {...SEOConfig} />

      <WaifuProvider>
        <Component {...pageProps} />
      </WaifuProvider>

      <Analytics />
    </main>
  );
};

export default api.withTRPC(MyApp);

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
