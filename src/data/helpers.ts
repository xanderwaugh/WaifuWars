import { ALL_WAIFUS } from "./waifus";

export const getRandomWaifu: (notThisOne?: number) => number = (
  notThisOne?: number,
) => {
  const idx = Math.floor(Math.random() * ALL_WAIFUS.length) + 1;

  if (notThisOne && ALL_WAIFUS[idx] === notThisOne)
    return getRandomWaifu(notThisOne);

  if (!ALL_WAIFUS[idx]) return getRandomWaifu(notThisOne);

  return ALL_WAIFUS[idx] as number;
};

export const getRandomWaifuPair = () => {
  const r1 = getRandomWaifu();
  const r2 = getRandomWaifu(r1);
  // if (r1 === r2) return getRandomWaifuPair();

  return [r1, r2] as const;
};
