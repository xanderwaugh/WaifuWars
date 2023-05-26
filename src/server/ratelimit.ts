// import { env } from "~/env.mjs";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { type NextApiRequest } from "next";

// * Rate Limiting
// const redis = new Redis({
//   url: env.UPSTASH_URL,
//   token: env.UPSTASH_TOKEN,
// });

// * In ms - was 300
// const TIMEOUT_MS = 150;

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(20, "10 s"),
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
  return success;
};
