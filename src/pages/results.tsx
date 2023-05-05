import { type GetStaticProps, type NextPage } from "next";

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
  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-8 py-16">
      <Head>
        <title>Waifu Wars - Results</title>
      </Head>

      <Header />

      {waifus && <SortedResults waifus={waifus} />}
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

export const getStaticProps: GetStaticProps = async () => {
  const waifuOrdered = await getWaifuOrder();

  // const DAY_IN_SECONDS = 60 * 60 * 24;
  const HOUR_IN_SECONDS = 60 * 60;
  return {
    props: { waifus: waifuOrdered },
    revalidate: HOUR_IN_SECONDS,
  };
};
