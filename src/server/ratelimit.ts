import { env } from "~/env.mjs";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { type NextApiRequest } from "next";

// * Rate Limiting
const redis = new Redis({
  url: env.UPSTASH_URL,
  token: env.UPSTASH_TOKEN,
});

const rateLimit = new Ratelimit({
  redis,
  timeout: 300, // * in ms
  limiter: Ratelimit.slidingWindow(20, "1 s"),
});

const getFingerprint = (req: NextApiRequest) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? (typeof forwarded === "string" ? forwarded : forwarded[0])?.split(/, /)[0]
    : req.socket.remoteAddress;
  return ip || "127.0.0.1";
};

export const ratelimit = async (req: NextApiRequest) => {
  const ip = getFingerprint(req);
  console.time("Rate limit");

  const { success, pending } = await rateLimit.limit(ip);
  await pending;

  console.timeEnd("Rate limit");
  if (!success) return false;

  return true;
};
