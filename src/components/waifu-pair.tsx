import { getWaifuPair } from "~/server/actions";
import { Updater } from "./utils/updater";
import { WaifuListing } from "./waifu";

interface PairProps {
  loading?: boolean;
}

const Pair: React.FC<PairProps> = async (props) => {
  const pair = await getWaifuPair();
  const nextPair = await getWaifuPair();

  return (
    <>
      <div
        style={{ opacity: props.loading ? 0.4 : 1 }}
        className="animate-fade-in mx-auto flex flex-col items-center justify-center p-8 transition-all duration-500 ease-in-out md:flex-row md:gap-4 lg:gap-16"
      >
        <WaifuListing
          id={0}
          waifu={pair.waifu1}
          against={pair.waifu2.id}
          // disabled={props.loading}
        />
        <p className="p-8 text-xl italic">
          {!props.loading ? "or" : <div className="size-5" />}
        </p>
        <WaifuListing
          id={1}
          waifu={pair.waifu2}
          against={pair.waifu1.id}
          // disabled={loading}
        />
      </div>
      <div>
        <Updater pair={pair} nextPair={nextPair} />
      </div>
    </>
  );
};

export { Pair };
