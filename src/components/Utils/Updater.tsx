"use client";
import { useEffect } from "react";
import { useWaifuContext } from "./Context";

import type { WaifuPair } from "~/validators/pair";
import { preloadImages } from "~/utils/preload";

interface UpdaterProps {
  pair: WaifuPair;
  nextPair: WaifuPair;
}

const Updater: React.FC<UpdaterProps> = ({
  pair: initialPair,
  nextPair: initialNextPair,
}) => {
  const { pair, setPair, nextPair, setNextPair } = useWaifuContext();

  useEffect(() => {
    if (!pair) setPair(initialPair);
  }, [initialPair, setPair, pair]);

  useEffect(() => {
    if (!nextPair) setNextPair(initialNextPair);
  }, [initialNextPair, setNextPair, nextPair]);

  // * Preload images
  useEffect(() => {
    // 288x384
    preloadImages([
      nextPair?.waifu1.imageCustom ?? nextPair?.waifu1.image,
      nextPair?.waifu2.imageCustom ?? nextPair?.waifu2.image,
    ]);
  }, [nextPair]);

  // return (
  //   <div className="py-4 text-center"><p>current: {pair?.waifu1.name} vs {pair?.waifu2.name}</p><p>next: {nextPair?.waifu1.name} vs {nextPair?.waifu2.name}</p></div>
  // );

  return null;
};

export default Updater;
