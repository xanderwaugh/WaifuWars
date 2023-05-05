import { useEffect, useState } from "react";
import { type NextPage } from "next";

import { api } from "~/utils/api";

import WaifuListing from "~/components/Waifu";
import Header from "~/components/Header";
import { ImSpinner2 } from "react-icons/im";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);

  const {
    data: waifuPair,
    isLoading,
    refetch,
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
    await refetch().catch(() => {
      console.error("Error refetching");
    });
  };

  useEffect(() => {
    setLoading(isLoading || voteMutation.isLoading);
  }, [isLoading, voteMutation.isLoading]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between overflow-hidden py-8">
      <div className="pt-8 text-center text-3xl md:text-4xl">
        Which Waifu is better?
      </div>

      {loading || !waifuPair ? (
        <div className="flex h-full w-full animate-spin flex-col items-center justify-center py-8 text-9xl duration-500 ease-in-out">
          <ImSpinner2 />
        </div>
      ) : (
        <div className="animate-fade-in mx-auto flex flex-col items-center justify-center p-8 md:flex-row md:gap-16">
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

      {/* {!waifuPair && <img src="/rings.svg" className="w-48" />} */}

      {/* Links */}
      <Header />
    </div>
  );
};

export default Home;
