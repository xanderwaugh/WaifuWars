import { type NextPage } from "next";

import { api } from "~/utils/api";

import Header from "~/components/Header";
import WaifuListing from "~/components/Waifu";

import { ImSpinner8 } from "react-icons/im";

const Home: NextPage = () => {
  const {
    data: waifuPair,
    isLoading,
    refetch,
    error,
    isError,
  } = api.waifu.getWaifuPair.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const voteMutation = api.waifu.vote.useMutation();

  const voteForWaifu = async (selected: number) => {
    if (!waifuPair) return;

    // * Check this later
    const against = (
      selected === waifuPair.waifu1.id ? waifuPair.waifu2 : waifuPair.waifu1
    ).id;

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

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "vote", {
        event_label: "vote",
        event_category: "waifu",
        votedFor: selected,
        votedAgainst: against,
      });
    }
    await refetch();
  };

  const loading = isLoading || voteMutation.isLoading;

  return (
    <div className="z-0 flex min-h-screen flex-col items-center justify-between overflow-hidden py-8">
      <h1 className="pt-8 text-center text-3xl md:text-4xl">
        Which Waifu is better?
      </h1>

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

      <div className="animate-fade-in mx-auto flex flex-col items-center justify-center p-8 md:flex-row md:gap-4 lg:gap-16">
        {waifuPair && (
          <>
            <WaifuListing
              waifu={waifuPair.waifu1}
              disabled={loading}
              vote={() => void voteForWaifu(waifuPair.waifu1.id)}
            />
            <p className="p-8 text-xl italic">{"or"}</p>
            <WaifuListing
              waifu={waifuPair.waifu2}
              disabled={loading}
              vote={() => void voteForWaifu(waifuPair.waifu2.id)}
            />
          </>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <button
          onClick={() => {
            if (!waifuPair || isLoading) return;
            void refetch();
          }}
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
