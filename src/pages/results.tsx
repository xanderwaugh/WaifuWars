import { useState, useMemo } from "react";
import { type GetStaticProps, type NextPage } from "next";

// Server
import { prisma } from "~/server/db";

// Client
import Head from "next/head";
import Header from "~/components/Header";
import ResultListing from "~/components/ResultListing";

interface RPageProps {
  waifus: WaifusQueryResult;
}

// Sort by VoteFor
function sortByVoteFor(waifus: WaifusQueryResult): WaifusQueryResult {
  return [...waifus].sort((a, b) => b._count.VoteFor - a._count.VoteFor);
}

// Sort by percentage of votes for
function sortByVotePercentage(waifus: WaifusQueryResult): WaifusQueryResult {
  return [...waifus].sort(
    (a, b) =>
      b._count.VoteFor / (b._count.VoteFor + b._count.VoteAgainst) -
      a._count.VoteFor / (a._count.VoteFor + a._count.VoteAgainst),
  );
}

const ResultsPage: NextPage<RPageProps> = ({ waifus }) => {
  const [sortedBy, setSortedBy] = useState<"perc" | "votes">("perc");

  const byVotes = useMemo(() => sortByVoteFor(waifus), [waifus]);
  const byPercent = useMemo(() => sortByVotePercentage(waifus), [waifus]);

  return (
    <div className="flex h-screen flex-col items-center justify-between gap-8 py-16">
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

      <ul className="flex w-full max-w-2xl flex-col border">
        {sortedBy === "perc"
          ? byPercent.map((curWaifu, idx) => (
              <ResultListing
                waifu={curWaifu}
                key={curWaifu.id}
                rank={idx + 1}
              />
            ))
          : byVotes.map((curWaifu, idx) => (
              <ResultListing
                waifu={curWaifu}
                key={curWaifu.id}
                rank={idx + 1}
              />
            ))}
      </ul>
    </div>
  );
};

export default ResultsPage;

export const getStaticProps: GetStaticProps = async () => {
  const waifuOrdered = await prisma.waifu.findMany({
    orderBy: { VoteFor: { _count: "desc" } },
    select: {
      id: true,
      name: true,
      image: true,
      url: true,
      _count: { select: { VoteFor: true, VoteAgainst: true } },
    },
  });

  // const DAY_IN_SECONDS = 60 * 60 * 24;
  const HOUR_IN_SECONDS = 60 * 60;
  return {
    props: { waifus: waifuOrdered },
    revalidate: HOUR_IN_SECONDS,
  };
};
