import Image from "next/image";
import Link from "next/link";
import { type Waifu } from "~/types";

const WaifuListing: React.FC<{
  waifu: Waifu;
  disabled: boolean;
  vote: () => void;
}> = (props) => {
  return (
    <div
      style={{ opacity: props.disabled ? 0.01 : 1 }}
      className="flex w-72 flex-col items-center justify-center gap-4 transition-opacity duration-300 ease-in-out"
    >
      <h2 className="line-clamp-1 max-w-xs overflow-ellipsis text-center text-2xl font-medium capitalize">
        {props.waifu.name.slice(0, 24)}
      </h2>

      <Link
        href={props.waifu.url}
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
        className="relative h-96 w-full transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
      >
        <Image
          src={props.waifu.imageCustom ?? props.waifu.image}
          alt={props.waifu.name}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          width={288}
          height={384}
          loading="eager"
          placeholder="blur"
          blurDataURL="/assets/placeholder.webp"
          // style={{ imageRendering: "pixelated" }}
          className="animate-fade-in h-full w-full rounded-md object-cover object-top"
        />
      </Link>

      <button
        onClick={() => void props.vote()}
        disabled={props.disabled}
        className="btn w-full"
      >
        Vote
      </button>
    </div>
  );
};

export default WaifuListing;
