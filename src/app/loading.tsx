import type { NextPage } from "next";

import { Header } from "~/components/navbar";
import { Spinner } from "~/components/spinner";

const Loading: NextPage = () => {
  return (
    <div className="z-0 flex min-h-screen flex-col items-center justify-between overflow-hidden py-16">
      <div className="flex flex-col items-center justify-center gap-1 pt-8 text-center">
        <h1 className="text-3xl md:text-4xl">Which Waifu is better?</h1>
      </div>

      <div>
        <Spinner className="size-24 fill-white text-9xl duration-1000 ease-in-out" />
      </div>

      <Header />
    </div>
  );
};

export default Loading;
