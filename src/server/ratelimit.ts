import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const rateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(20, "10 s"),
});

const getFingerprint = (req: NextRequest) => {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded
    ? // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      (typeof forwarded === "string" ? forwarded : forwarded[0])?.split(/, /)[0]
    : // : req.ip;
      req.headers.get("x-real-ip");
  // : req.socket.remoteAddress;

  return ip ?? "127.0.0.1";
};

export const ratelimit = async (req: NextRequest) => {
  const ip = getFingerprint(req);

  console.time("Rate limit");

  const { success, pending } = await rateLimiter.limit(ip);
  await pending;

  console.timeEnd("Rate limit");
  // * Whether the request may pass(true) or exceeded the limit(false)
  return success;
};
