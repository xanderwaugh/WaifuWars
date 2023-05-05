import { Suspense, useState } from "react";
import { type GetServerSideProps, type NextPage } from "next";

// Server
import { prisma } from "~/server/db";

// Client
import Head from "next/head";
import dynamic from "next/dynamic";
import Header from "~/components/Header";
// import SortedResults from "~/components/SortedResults";
const SortedResults = dynamic(() => import("~/components/SortedResults"), {
  ssr: false,
});

interface RPageProps {
  waifus: WaifusQueryResult;
}

const ResultsPage: NextPage<RPageProps> = ({ waifus }) => {
  const [sortedBy, setSortedBy] = useState<"perc" | "votes">("perc");

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

      <Suspense fallback={null}>
        {waifus && <SortedResults waifus={waifus} sortedBy={sortedBy} />}
      </Suspense>
    </div>
  );
};

export default ResultsPage;

const getWaifuOrder = async () => {
  return await prisma.waifu.findMany({
    orderBy: { VoteFor: { _count: "desc" } },
    select: {
      id: true,
      name: true,
      image: true,
      url: true,
      _count: { select: { VoteFor: true, VoteAgainst: true } },
    },
  });
};

export const getServerSideProps: GetServerSideProps = async () => {
  const waifuOrdered = await getWaifuOrder();

  // const DAY_IN_SECONDS = 60 * 60 * 24;
  const HOUR_IN_SECONDS = 60 * 60;
  return {
    props: { waifus: waifuOrdered },
    revalidate: HOUR_IN_SECONDS,
  };
};
