import { type NextPage } from "next";

import { api } from "~/utils/api";

import WaifuListing from "~/components/Waifu";
import Header from "~/components/Header";
import { ImSpinner8 } from "react-icons/im";

const Home: NextPage = () => {
  const {
    data: waifuPair,
    isLoading,
    refetch,
    error,
  } = api.waifu.getWaifuPair.useQuery();

  const voteMutation = api.waifu.vote.useMutation();

  const voteForWaifu = async (selected: number) => {
    if (!waifuPair) return;

    if (selected === waifuPair.waifu1.id) {
      // * If vote 1st waifu
      await voteMutation.mutateAsync({
        votedFor: waifuPair.waifu1.id,
        votedAgainst: waifuPair.waifu2.id,
      });
    } else {
      // * If vote 2nd waifu
      await voteMutation.mutateAsync({
        votedFor: waifuPair.waifu2.id,
        votedAgainst: waifuPair.waifu1.id,
      });
    }

    // plausible("cast-vote");
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "post_score", {
        score: 1,
        level: 1,
        character: selected,
      });
    }
    await refetch();
  };

  const loading = isLoading || voteMutation.isLoading;

  return (
    <div className="z-0 flex min-h-screen flex-col items-center justify-between overflow-hidden py-8">
      <div className="pt-8 text-center text-3xl md:text-4xl">
        Which Waifu is better?
      </div>

      {error && (
        <div className="flex h-full w-full flex-col items-center justify-center py-8 text-9xl duration-500 ease-in-out">
          <div className="text-3xl text-red-500">Error loading waifu pair</div>
          <div className="text-3xl text-red-500">{error.message}</div>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-full text-9xl">
          <ImSpinner8 className="animate-spin duration-700 ease-in-out" />
        </div>
      )}

      {waifuPair && (
        <div className="animate-fade-in mx-auto flex flex-col items-center justify-center p-8 md:flex-row md:gap-4 lg:gap-16">
          <WaifuListing
            waifu={waifuPair.waifu1}
            disabled={loading}
            vote={() => void voteForWaifu(waifuPair.waifu1.id)}
          />
          <div className="p-8 text-xl italic">{"or"}</div>
          <WaifuListing
            waifu={waifuPair.waifu2}
            disabled={loading}
            vote={() => void voteForWaifu(waifuPair.waifu2.id)}
          />
        </div>
      )}

      <Header />
    </div>
  );
};

export default Home;
