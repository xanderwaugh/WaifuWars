import type { Metadata, NextPage } from "next";

import HomeLoading from "~/components/loader";
import { Header } from "~/components/navbar";
import { SkipButton } from "~/components/skip-button";
import { Pair } from "~/components/waifu-pair";

const Home: NextPage = () => {
  // throw new Error("This is a test error");

  return (
    <div className="z-0 flex min-h-screen flex-col items-center justify-between overflow-hidden py-16">
      <div className="flex flex-col items-center justify-center gap-1 pt-8 text-center">
        <h1 className="text-3xl md:text-4xl">Which Waifu is better?</h1>
        {/* <p className="text-xl md:text-2xl">
          You have voted <span className="font-bold">{numVotes}</span> times.
        </p> */}
      </div>

      <HomeLoading />

      <div className="min-h-[36rem]">
        <Pair />
      </div>

      <SkipButton />

      <Header />
    </div>
  );
};

export default Home;

export const metadata: Metadata = {
  title: "Waifu Wars",
  description: "Vote for the best waifu!",
};

export const dynamic = "force-dynamic";
