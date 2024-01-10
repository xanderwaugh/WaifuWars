import { NextResponse, type NextRequest } from "next/server";
import { getWaifuPair } from "~/server/actions";
import { ratelimit } from "~/server/ratelimit";

export async function GET(req: NextRequest) {
  const success = await ratelimit(req);
  if (!success) {
    return NextResponse.json(null, {
      status: 429,
      statusText: "Too many requests",
    });
  }

  const newPair = await getWaifuPair();
  return NextResponse.json(newPair);
}
