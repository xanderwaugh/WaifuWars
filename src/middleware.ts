import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ratelimit } from "./server/ratelimit";

const ratelimitPaths = ["/", "/results", "/results/"];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (!ratelimitPaths.includes(path)) {
    return NextResponse.next();
  }

  // * Whether the request may pass(true) or exceeded the limit(false)
  const success = await ratelimit(req);
  if (!success) {
    console.log("Rate limit exceeded");
    await sleep(250);
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - about (about page)
     */
    {
      source: "/((?!api|_next/static|assets|about|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    // * Match the root path
    "/",
  ],
};
