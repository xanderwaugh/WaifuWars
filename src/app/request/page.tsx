import type { Metadata, NextPage } from "next";

import { Header } from "~/components/navbar";

const RequestPage: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-between gap-8 py-16">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-4xl">Request New Waifu!</h1>

        <div className="text-center text-lg"></div>
      </div>

      <Header />
    </div>
  );
};

export default RequestPage;

export const metadata: Metadata = {
  title: "Waifu Wars - Request",
  description: "Vote for the best waifu!",
  // image: "/assets/og-image.png",
};
