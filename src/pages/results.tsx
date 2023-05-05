import { useState } from "react";
import { type NextPage } from "next";

import Head from "next/head";

import { api } from "~/utils/api";

import Header from "~/components/Header";
import ResultListing from "~/components/ResultListing";

const ResultsPage: NextPage = () => {
  const [sortedBy, setSortedBy] = useState<"perc" | "votes">("perc");
  const { data } = api.waifu.results.useQuery({
    sortedBy,
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-8 py-16">
      <Head>
        <title>Waifu Wars - Results</title>
      </Head>

      <Header />

      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-center text-4xl">Results</div>
        <div className="text-center text-lg">
          Sorted by{" "}
          <span
            onClick={() => setSortedBy("perc")}
            style={{ textDecoration: sortedBy === "perc" ? "underline" : "" }}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            percentage
          </span>
          {" or "}
          <span
            onClick={() => setSortedBy("votes")}
            style={{ textDecoration: sortedBy === "votes" ? "underline" : "" }}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            votes
          </span>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4">
        <ul className="flex w-full max-w-2xl flex-col border">
          {data?.waifus?.map((curWaifu, idx) => (
            <ResultListing
              key={curWaifu.id.toString() + "perc"}
              waifu={curWaifu}
              rank={idx + 1}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultsPage;
