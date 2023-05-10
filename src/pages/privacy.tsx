import { type NextPage } from "next";

import Head from "next/head";
import Header from "~/components/Header";

const PrivacyPage: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-between gap-8 py-16">
      <Head>
        <title>Waifu Wars - Privacy Notice</title>
        <meta name="description" content="Waifu Wars - Privacy Notice" />
        <link rel="canonical" href="https://waifuwars.net/privacy" />
      </Head>

      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-4xl">Privacy Notice</h1>

        <div className="text-center text-lg"></div>
        <ul className="flex max-w-sm list-disc flex-col items-start pt-12 text-left text-lg font-medium">
          {/* <li>Google Analytics</li> */}
          <li>
            This website uses Google Analytics to collect anonymous information
            such as the number of visitors to the site, and the most popular
            pages.
          </li>
          <li></li>
          <li>
            Information collected includes number of votes for each waifu, and
            the page views.
          </li>
          <li></li>
          <li>
            The only cookies used are for Google Analytics, and are used to
            identify unique visitors.
          </li>
        </ul>
      </div>

      <Header />
    </div>
  );
};

export default PrivacyPage;
