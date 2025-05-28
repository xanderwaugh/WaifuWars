import type { Metadata, NextPage } from "next";
import { Suspense } from "react";

import { Header } from "~/components/navbar";
import Results from "~/components/results";
import { sortByVotes } from "~/data/sort";
import { prisma } from "~/server/db";

const ResultsPage: NextPage = async () => {
  const unsorted = await prisma.waifu.findMany({
    orderBy: { VoteFor: { _count: "desc" } },
    select: {
      id: true,
      name: true,
      image: true,
      url: true,
      imageLarge: true,
      imageCustom: true,
      bio: false,
      _count: { select: { VoteFor: true, VoteAgainst: true } },
    },
  });

  const waifus = sortByVotes(unsorted);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-8 py-16">
      <Header />

      <div className="min-h-[36rem]">
        <Suspense fallback={null}>
          <Results waifus={waifus} />
        </Suspense>
      </div>
    </div>
  );
};

export default ResultsPage;

export const revalidate = 600; // 10 minutes

export const metadata: Metadata = {
  title: "Waifu Wars - Results",
  description: "Voting results for the best waifu!",
};
