"use client";
// import { useRouter } from "next/navigation";
import { useWaifuContext } from "./Utils/Context";

const SkipButton: React.FC = () => {
  // const router = useRouter();
  const {
    //
    loading,
    setLoading,
    nextPair,
    setPair,
    getNextPair,
  } = useWaifuContext();

  const skip = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 60)); // 240

    nextPair && setPair(nextPair);
    getNextPair();
    setLoading(false);
    // router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        onClick={() => void skip()}
        disabled={loading}
        className="btn border-2 border-gray-500 hover:border-gray-600 hover:bg-gray-600 hover:text-white"
      >
        Skip
      </button>
    </div>
  );
};

export default SkipButton;
