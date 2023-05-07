import Image from "next/image";
import Link from "next/link";
import { genCountPerc } from "~/utils";

interface ResultListingProps {
  waifu: WaifusQueryResult[number];
  rank: number;
}

const ResultListing: React.FC<ResultListingProps> = ({ waifu, rank }) => {
  return (
    <li>
      <Link
        href={waifu.url ?? "/"}
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
        className="relative flex items-center justify-between border-b p-1 pr-6"
      >
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Image
              src={waifu.imageLarge ?? waifu.image}
              alt={waifu.name}
              width={64}
              height={64}
              placeholder="blur"
              blurDataURL="/assets/placeholder.webp"
              className="object-cover"
            />
            <div className="capitalize">{waifu.name}</div>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <span>{genCountPerc(waifu).toFixed(2) + "%"}</span>
          <span>
            <span>{waifu._count.VoteFor} votes</span>
          </span>
        </div>
        <div className="absolute left-0 top-0 z-20 flex flex-col items-center justify-center rounded-br-md border border-gray-500 bg-gray-600 px-2 font-semibold text-white shadow-lg">
          <span>{rank}</span>
        </div>
      </Link>
    </li>
  );
};

export default ResultListing;
