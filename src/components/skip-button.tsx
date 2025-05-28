"use client";

// import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useWaifuContext } from "./utils/context";

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

    if (nextPair) setPair(nextPair);
    getNextPair();
    setLoading(false);
    // router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button
        onClick={() => void skip()}
        type="button"
        disabled={loading}
        variant="secondary"
      >
        Skip
      </Button>
    </div>
  );
};

export { SkipButton };
