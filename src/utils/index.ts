import { type WaifusQueryResult } from "~/types";

export interface NavItemProps {
  label: string;
  href: string;
  subLabel?: string;
  children?: Array<NavItemProps>;
}

export const NAV_ITEMS: Array<NavItemProps> = [
  { label: "Home", href: "/" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about" },
];

// * Util Functions
interface Omit {
  <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };
}

export const omit: Omit = (obj, ...keys) => {
  const ret = {} as {
    [K in keyof typeof obj]: (typeof obj)[K];
  };
  let key: keyof typeof obj;
  for (key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
};

export const genCountPerc = (waifu: WaifusQueryResult[number]) => {
  const { VoteFor, VoteAgainst } = waifu._count;
  if (VoteFor + VoteAgainst === 0) return 0;

  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};
