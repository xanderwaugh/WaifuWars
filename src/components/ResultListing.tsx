import Image from "next/image";
import { genCountPerc } from "~/utils";

interface ResultListingProps {
  waifu: WaifusQueryResult[number];
  rank: number;
}

const ResultListing: React.FC<ResultListingProps> = ({ waifu, rank }) => {
  return (
    <li className="relative flex items-center justify-between border-b p-1 pr-6">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <Image
            src={waifu.image}
            alt={waifu.name}
            width={64}
            height={64}
            className="object-cover"
          />
          <div className="capitalize">{waifu.name}</div>
        </div>
      </div>
      <div className="">{genCountPerc(waifu).toFixed(2) + "%"}</div>
      <div className="absolute left-0 top-0 z-20 flex items-center justify-center rounded-br-md border border-gray-500 bg-gray-600 px-2 font-semibold text-white shadow-lg">
        {rank}
      </div>
    </li>
  );
};

export default ResultListing;
