import type { NextPage } from "next";

import Header from "~/components/Header";
import Spinner from "~/components/Spinner";

const Loading: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-8 py-16">
      <Header />

      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-4xl">Results</h1>

        <div className="text-center text-lg">
          Sorted by{" "}
          <span className="cursor-pointer text-blue-500 underline hover:underline">
            votes
          </span>
          {" or "}
          <span className="cursor-pointer text-blue-500 hover:underline">
            percentage
          </span>
        </div>
      </div>

      <div className="fixed bottom-10 right-10 z-20 text-9xl">
        <div className="flex h-full items-center justify-center">
          <Spinner className="size-24 fill-white text-9xl duration-1000 ease-in-out" />
        </div>
      </div>

      <div className="flex size-full items-center justify-center px-4">
        <ul className="flex w-full max-w-2xl flex-col border">
          {Array.from({ length: 16 }).map((_, i) => (
            <li
              key={i}
              className="relative flex h-20 animate-pulse items-center justify-between border-b bg-gray-700/5 p-1 pr-6 transition-all duration-150"
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Loading;
