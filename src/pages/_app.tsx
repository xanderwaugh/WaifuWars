import "~/styles/globals.css";
import { type AppType, type NextWebVitalsMetric } from "next/app";
import Script from "next/script";

import { DefaultSeo } from "next-seo";
import { SEOConfig } from "~/utils/seoConfig";

import { api } from "~/utils/api";
import { WaifuProvider } from "~/utils/Context";

import { Montserrat } from "next/font/google";

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

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-PNL6BCD0QW"
      />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-PNL6BCD0QW');
        `}</Script>
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
