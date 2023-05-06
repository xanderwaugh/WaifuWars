import { type AppType, type NextWebVitalsMetric } from "next/app";
import Script from "next/script";

import { DefaultSeo } from "next-seo";
import { SEOConfig } from "~/utils/seoConfig";

import { api } from "~/utils/api";

import { Montserrat } from "next/font/google";
import "~/styles/globals.css";

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

      <Component {...pageProps} />

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-PNL6BCD0QW"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-PNL6BCD0QW');
        `,
        }}
      />
      {/* GTAG */}
      {/* <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WR3NXH5');`,
        }}
      />
      <noscript> <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-WR3NXH5"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        /> </noscript> */}
    </main>
  );
};

export default api.withTRPC(MyApp);

export function reportWebVitals(props: NextWebVitalsMetric) {
  if (typeof window === "undefined") return;
  const { id, name, label, value } = props;
  if (!window.gtag) return;
  window.gtag("event", name, {
    event_category:
      label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value),
    event_label: id,
    non_interaction: true,
  });
}
