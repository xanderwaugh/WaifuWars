import Link from "next/link";
import Image from "next/image";

import { genCountPerc } from "~/utils";

interface ResultListingProps {
  waifu: WaifusQueryResult[number];
  rank: number;
}

const ResultListing: React.FC<ResultListingProps> = ({ waifu, rank }) => {
  const countPerc = genCountPerc(waifu).toFixed(2) + "%";

  return (
    <li className="min-h-20">
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
              src={waifu.imageCustom ?? waifu.image}
              alt={waifu.name}
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              width={80} // 80 <- 64
              height={128} // 160 <- 80 <- 64
              loading={rank < 10 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="/assets/placeholder.webp"
              className="h-32 w-20 rounded-sm object-cover"
              // max-h-32 min-h-20
            />
            <p className="capitalize">{waifu.name}</p>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <p>{countPerc}</p>
          <p>
            {waifu._count.VoteFor} - {waifu._count.VoteAgainst}
          </p>
        </div>
        <div className="absolute left-0 top-0 z-20 flex flex-col items-center justify-center rounded-br-md border border-gray-500 bg-gray-600 px-2 font-semibold text-white shadow-lg">
          <p>{rank}</p>
        </div>
      </Link>
    </li>
  );
};

export default ResultListing;
