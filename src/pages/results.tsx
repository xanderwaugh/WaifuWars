import { useState } from "react";
import { type GetStaticProps, type NextPage } from "next";

import { prisma } from "~/server/db";

import Head from "next/head";

import Header from "~/components/Header";
import ResultListing from "~/components/ResultListing";

interface ResultsPageProps {
  waifus: WaifusQueryResult;
}

const ResultsPage: NextPage<ResultsPageProps> = ({ waifus }) => {
  const [sortedBy, setSortedBy] = useState<"perc" | "votes">("perc");

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-8 py-16">
      <Head>
        <title>Waifu Wars - Results</title>
        <meta name="description" content="Waifu Wars - Results" />
      </Head>

      <Header />

      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-4xl">Results</h1>
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
          {sortedBy === "votes"
            ? waifus
                .sort((a, b) => b._count.VoteFor - a._count.VoteFor)
                .map((curWaifu, idx) => (
                  <ResultListing
                    key={curWaifu.id.toString() + "perc"}
                    waifu={curWaifu}
                    rank={idx + 1}
                  />
                ))
            : waifus
                ?.sort(
                  (a, b) =>
                    b._count.VoteFor /
                      (b._count.VoteFor + b._count.VoteAgainst) -
                    a._count.VoteFor /
                      (a._count.VoteFor + a._count.VoteAgainst),
                )
                .map((curWaifu, idx) => (
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

export const getStaticProps: GetStaticProps = async () => {
  const waifus = await prisma.waifu.findMany({
    orderBy: { VoteFor: { _count: "desc" } },
    select: {
      id: true,
      name: true,
      image: true,
      url: true,
      imageLarge: true,
      bio: true,
      _count: { select: { VoteFor: true, VoteAgainst: true } },
    },
  });

  // const HOUR_IN_SECONDS = 60 * 60;
  // const FIFTEEN_MINS = 60 * 15;
  const TEN_MINS = 60 * 10;

  return {
    props: { waifus },
    revalidate: TEN_MINS,
  };
};
