export interface NavItemProps {
  label: string;
  href: string;
  subLabel?: string;
  children?: NavItemProps[];
}

export const NAV_ITEMS: NavItemProps[] = [
  { label: "Home", href: "/" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about" },
];

// * Util Functions
type Omit = <T extends object, K extends [...(keyof T)[]]>(
  obj: T,
  ...keys: K
) => {
  [K2 in Exclude<keyof T, K[number]>]: T[K2];
};

export const omit: Omit = (obj, ...keys) => {
  const ret = {} as {
    [K in keyof typeof obj]: (typeof obj)[K];
  };
  let key: keyof typeof obj;
  for (key in obj) {
    if (!keys.includes(key)) {
      // eslint-disable-next-line security/detect-object-injection
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

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? "3000"}`; // dev SSR should use localhost
};

export const BLUR_DATA_URL =
  "https://drhf1g4gb8ywl.cloudfront.net/assets/placeholder.webp" as const;
