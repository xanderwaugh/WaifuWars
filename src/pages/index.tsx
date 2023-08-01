import { useContext } from "react";
import { type NextPage } from "next";

import dynamic from "next/dynamic";

import { api } from "~/utils/api";
import { voteEvent } from "~/utils/gtag";
import { WaifuContext } from "~/utils/Context";
import { type Vote } from "~/types";

import Header from "~/components/Header";
import { ImSpinner8 } from "react-icons/im";

const Pair = dynamic(() => import("~/components/Pair"));

const Home: NextPage = () => {
  const { addVote } = useContext(WaifuContext);

  const {
    data: waifuPair,
    isLoading,
    refetch,
    isRefetching,
    error,
    isError,
  } = api.waifu.getWaifuPair.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const voteMutation = api.waifu.vote.useMutation();

  const loading =
    isLoading || voteMutation.isLoading || isRefetching || !waifuPair;

  const voteForWaifu = async (selected: number) => {
    if (!waifuPair || loading) return;
    // * Check this later
    const against = (
      selected === waifuPair.waifu1.id ? waifuPair.waifu2 : waifuPair.waifu1
    ).id;

    let res: { vote: Vote; success: boolean };

    if (selected === waifuPair.waifu1.id) {
      // * If vote 1st waifu
      res = await voteMutation.mutateAsync({
        votedFor: waifuPair.waifu1.id,
        votedAgainst: waifuPair.waifu2.id,
      });
    } else {
      // * If vote 2nd waifu
      res = await voteMutation.mutateAsync({
        votedFor: waifuPair.waifu2.id,
        votedAgainst: waifuPair.waifu1.id,
      });
    }

    addVote(res.vote);
    voteEvent(selected, against);
    await refetch();
  };

  const skip = () => {
    if (!waifuPair || loading) return;
    refetch().catch((e) => console.error(e));
  };

  return (
    <div className="z-0 flex min-h-screen flex-col items-center justify-between overflow-hidden py-16">
      <div className="flex flex-col items-center justify-center gap-1 pt-8 text-center">
        <h1 className="text-3xl md:text-4xl">Which Waifu is better?</h1>
        {/* <p className="text-xl md:text-2xl">
          You have voted <span className="font-bold">{numVotes}</span> times.
        </p> */}
      </div>

      {isError && error && (
        <div className="flex h-full w-full flex-col items-center justify-center py-8 text-9xl duration-500 ease-in-out">
          <h2 className="text-3xl text-red-500">Error loading waifu pair</h2>
          <h3 className="text-3xl text-red-500">{error.message}</h3>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-full text-9xl">
          <ImSpinner8 className="animate-spin duration-700 ease-in-out" />
        </div>
      )}

      {waifuPair && (
        <Pair
          voteForWaifu={(id) => voteForWaifu(id)}
          waifuPair={waifuPair}
          loading={loading}
        />
      )}

      <div className="flex flex-col items-center justify-center gap-4">
        <button
          onClick={skip}
          className="btn border-2 border-gray-500 hover:border-gray-600 hover:bg-gray-600 hover:text-white"
        >
          Skip
        </button>
      </div>

      <Header />
    </div>
  );
};

export default Home;
