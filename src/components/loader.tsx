"use client";

import { Spinner } from "./spinner";
import { useWaifuContext } from "./utils/context";

// * When loading is true, show the spinner
const HomeLoading: React.FC = () => {
  const { loading } = useWaifuContext();

  if (!loading) return null;

  return (
    <div className="absolute inset-0 flex h-[92%] flex-col items-center justify-center text-9xl">
      <Spinner className="size-24 fill-white text-9xl duration-1000 ease-in-out" />
    </div>
  );
};

export default HomeLoading;
