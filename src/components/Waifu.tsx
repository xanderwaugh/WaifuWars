import Image from "next/image";
import Spinner from "./Spinner";
import Link from "next/link";

const WaifuListing: React.FC<{
  waifu: Waifu;
  disabled: boolean;
  vote: () => void;
}> = (props) => {
  return (
    <div
      style={{ opacity: props.disabled ? 0.5 : 1 }}
      className="flex flex-col items-center justify-center gap-4 transition-opacity"
    >
      <div className="line-clamp-1 max-w-xs overflow-ellipsis text-center text-2xl font-medium capitalize">
        {props.waifu.name.slice(0, 24)}
      </div>

      <Link
        href={props.waifu.url}
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
        className="relative max-w-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
      >
        <Image
          src={props.waifu.image}
          alt={props.waifu.name}
          width={256}
          height={256}
          style={{ imageRendering: "pixelated" }}
          // layout="fixed"
          className="animate-fade-in h-full rounded-sm object-cover"
        />
      </Link>

      <button
        className="btn"
        onClick={() => void props.vote()}
        disabled={props.disabled}
      >
        {props.disabled ? <Spinner /> : "Vote"}
      </button>
    </div>
  );
};

export default WaifuListing;
