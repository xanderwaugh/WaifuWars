import { type NextPage } from "next";

import { api } from "~/utils/api";

import WaifuListing from "~/components/Waifu";
import Link from "next/link";

const Home: NextPage = () => {
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

  const loading = isLoading || voteMutation.isLoading;

  return (
    <div className="flex h-screen flex-col items-center justify-between py-8">
      <div className="pt-8 text-center text-4xl">Which Waifu is better?</div>

      {waifuPair && (
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

export default Home;
