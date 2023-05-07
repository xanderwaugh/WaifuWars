import Link from "next/link";
import Image from "next/image";

const WaifuListing: React.FC<{
  waifu: Waifu;
  disabled: boolean;
  vote: () => void;
}> = (props) => {
  return (
    <div
      style={{ opacity: props.disabled ? 0.0 : 1 }}
      // style={{ opacity: 0.25 }}
      className="flex w-72 flex-col items-center justify-center gap-4 transition-opacity duration-300 ease-in-out"
    >
      <div className="line-clamp-1 max-w-xs overflow-ellipsis text-center text-2xl font-medium capitalize">
        {props.waifu.name.slice(0, 24)}
      </div>

      <Link
        href={props.waifu.url}
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
        className="relative h-96 w-full transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
      >
        <Image
          src={props.waifu.imageLarge ?? props.waifu.image}
          // src={props.waifu.image}
          alt={props.waifu.name}
          // fill={true}
          width={256}
          height={256}
          placeholder="blur"
          blurDataURL="/assets/placeholder.webp"
          // style={{ imageRendering: "pixelated" }}
          className="animate-fade-in h-full w-full rounded-md object-cover object-center"
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
