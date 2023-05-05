import { type AppType } from "next/app";

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
    </main>
  );
};

export default api.withTRPC(MyApp);
