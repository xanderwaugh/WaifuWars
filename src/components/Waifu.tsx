"use client";
import { useWaifuContext } from "./Utils/Context";

import Link from "next/link";
import Image from "next/image";

import { voteForPair } from "~/server/actions";

import { voteEvent } from "~/utils/gtag";
import { BLUR_DATA_URL } from "~/utils";

interface WaifuListingProps {
  id: number;
  waifu: Waifu;
  against: number;
  disabled?: boolean;
}

const WaifuListing: React.FC<WaifuListingProps> = (props) => {
  const {
    //
    addVote,
    loading,
    setLoading,
    nextPair,
    setPair,
    pair,
    getNextPair,
  } = useWaifuContext();

  const waifu = props.id === 0 ? pair?.waifu1 : pair?.waifu2;

  const vote = async () => {
    setLoading(true);
    const selected = waifu?.id;
    const against = props.against;

    if (!selected) return;

    const { vote } = await voteForPair({ selected, against });
    // console.table(vote);

    addVote(vote);
    voteEvent(selected, against);
    nextPair && setPair(nextPair);
    getNextPair();
    setLoading(false);

    // router.refresh();
  };

  return (
    <div
      style={{ opacity: loading ? 0.6 : 1 }}
      className="flex w-72 flex-col items-center justify-center gap-4 transition-opacity duration-300 ease-in-out"
    >
      <h2 className="line-clamp-1 max-w-xs text-ellipsis text-center text-2xl font-medium capitalize">
        {waifu?.name.slice(0, 24) ?? props.waifu.name.slice(0, 24)}
      </h2>

      <Link
        href={waifu?.url ?? props.waifu.url}
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
        className="relative h-96 w-full transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
      >
        <Image
          src={waifu?.imageCustom ?? waifu?.image ?? props.waifu.image}
          alt={props.waifu.name}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          width={288}
          height={384}
          loading="eager"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          // style={{ imageRendering: "pixelated" }}
          // ? pixelated
          className="animate-fade-in pixelated size-full rounded-md object-cover object-top"
        />
      </Link>

      <button
        onClick={() => void vote()}
        disabled={loading}
        className="btn w-full"
      >
        Vote
      </button>
    </div>
  );
};

export default WaifuListing;
