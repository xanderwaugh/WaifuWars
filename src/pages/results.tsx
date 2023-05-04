import { type GetStaticProps, type NextPage } from "next";

// Server
import { prisma } from "~/server/db";

// Client
import Link from "next/link";
import Head from "next/head";
import { genCountPerc } from "~/utils";

import ResultListing from "~/components/ResultListing";

const getWaifusInOrder = async () => {
  return await prisma.waifu.findMany({
    orderBy: {
      VoteFor: { _count: "desc" },
    },
    select: {
      id: true,
      name: true,
      image: true,
      _count: { select: { VoteFor: true, VoteAgainst: true } },
    },
  });
};

const ResultsPage: NextPage<{
  waifus: WaifusQueryResult;
}> = (props) => {
  return (
    <div className="flex h-screen flex-col items-center justify-between py-8">
      <Head>
        <title>Waifu Wars - Results</title>
      </Head>
      <div className="py-8 text-center text-4xl">Results</div>

      {/* {!waifuPair && <img src="/rings.svg" className="w-48" />} */}
      <ul className="flex w-full max-w-2xl flex-col border">
        {props.waifus
          .sort((a, b) => {
            const difference = genCountPerc(b) - genCountPerc(a);
            if (difference === 0) {
              return b._count.VoteFor - a._count.VoteFor;
            }
            return difference;
          })
          .map((curWaifu, idx) => (
            <ResultListing waifu={curWaifu} key={idx} rank={idx + 1} />
          ))}
      </ul>

      {/* Links */}
      <div className="flex w-full flex-row items-center justify-center gap-8 py-12 text-xl">
        <Link href="/" className="link">
          Home
        </Link>
        <span> - </span>
        <Link href="/results" className="link">
          Results
        </Link>
        <span> - </span>
        <Link href="/about" className="link">
          About
        </Link>
      </div>
    </div>
  );
};

export default ResultsPage;

export const getStaticProps: GetStaticProps = async () => {
  const waifuOrdered = await getWaifusInOrder();
  const DAY_IN_SECONDS = 60 * 60 * 24;
  return {
    props: { waifus: waifuOrdered },
    revalidate: DAY_IN_SECONDS,
  };
};
