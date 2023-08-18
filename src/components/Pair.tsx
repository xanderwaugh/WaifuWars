import WaifuListing from "./Waifu";

interface PairProps {
  waifuPair: {
    waifu1: Waifu;
    waifu2: Waifu;
  };
  loading?: boolean;
  voteForWaifu: (selected: number) => Promise<void>;
}

const Pair: React.FC<PairProps> = ({
  waifuPair,
  loading = true,
  voteForWaifu,
}) => {
  return (
    <div
      style={{ opacity: loading ? 0.4 : 1 }}
      className="animate-fade-in mx-auto flex flex-col items-center justify-center p-8 transition-all duration-500 ease-in-out md:flex-row md:gap-4 lg:gap-16"
    >
      <WaifuListing
        waifu={waifuPair.waifu1}
        disabled={loading}
        vote={() => void voteForWaifu(waifuPair.waifu1.id)}
      />
      <p className="p-8 text-xl italic">
        {!loading ? "or" : <div className="h-5 w-5" />}
      </p>
      <WaifuListing
        waifu={waifuPair.waifu2}
        disabled={loading}
        vote={() => void voteForWaifu(waifuPair.waifu2.id)}
      />
    </div>
  );
};

export default Pair;
