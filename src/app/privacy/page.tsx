import type { Metadata, NextPage } from "next";

import Header from "~/components/Header";

const PrivacyPage: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-between gap-8 py-16">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-4xl">Privacy Notice</h1>

        <div className="text-center text-lg"></div>
        <ul className="flex max-w-sm list-disc flex-col items-start pt-12 text-left text-lg font-medium">
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

export const metadata: Metadata = {
  title: "Waifu Wars - Privacy Notice",
  description: "Vote for the best waifu!",
  // image: "/assets/og-image.png",
};
