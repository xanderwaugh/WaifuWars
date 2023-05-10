import { useState } from "react";
import { type NextPage, type GetStaticProps } from "next";

// * Server
import { prisma } from "~/server/db";
import { type WaifusQueryResult } from "~/types";

import Head from "next/head";

import Header from "~/components/Header";
import ResultListing from "~/components/ResultListing";

import { ImSpinner8 } from "react-icons/im";
import { sortByPerc, sortByVotes } from "~/data/sort";

type Sort = "perc" | "votes";

interface Props {
  waifus?: WaifusQueryResult;
}

const ResultsPage: NextPage<Props> = ({ waifus }) => {
  const [sort, setSort] = useState<Sort>("votes");
  const byPerc = sortByPerc([...(waifus ?? [])]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-8 py-16">
      <Head>
        <title>Waifu Wars - Results</title>
        <meta name="description" content="Waifu Wars - Results" />
        <link rel="canonical" href="https://waifuwars.net/results" />
      </Head>

      <Header />

      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-4xl">Results</h1>

        <div className="text-center text-lg">
          Sorted by{" "}
          <span
            onClick={() => setSort("votes")}
            style={{
              textDecoration: sort === "votes" ? "underline" : undefined,
            }}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            votes
          </span>
          {" or "}
          <span
            onClick={() => setSort("perc")}
            style={{
              textDecoration: sort === "perc" ? "underline" : undefined,
            }}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            percentage
          </span>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4">
        {!waifus ? (
          <div className="flex flex-col items-center justify-center overflow-hidden rounded-full text-9xl">
            <ImSpinner8 className="animate-spin duration-700 ease-in-out" />
          </div>
        ) : (
          <ul className="flex w-full max-w-2xl flex-col border">
            {sort === "perc"
              ? byPerc.map((curWaifu, idx) => (
                  <ResultListing
                    key={`${curWaifu.id}-perc`}
                    waifu={curWaifu}
                    rank={idx + 1}
                  />
                ))
              : waifus.map((curWaifu, idx) => (
                  <ResultListing
                    key={`${curWaifu.id}-votes`}
                    waifu={curWaifu}
                    rank={idx + 1}
                  />
                ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;

export const getStaticProps: GetStaticProps = async () => {
  const waifus = await prisma.waifu.findMany({
    orderBy: { VoteFor: { _count: "desc" } },
    select: {
      id: true,
      name: true,
      image: true,
      url: true,
      imageLarge: true,
      imageCustom: true,
      bio: true,
      _count: { select: { VoteFor: true, VoteAgainst: true } },
    },
  });

  const sorted = sortByVotes(waifus);
  const TEN_MINS = 60 * 10;

  return {
    props: { waifus: sorted },
    revalidate: TEN_MINS,
  };
};
