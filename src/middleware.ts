import type { NextMiddleware, NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ratelimit } from "./server/ratelimit";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// const intlMiddleware = createIntlMiddleware({
//   locales,
//   localePrefix: "as-needed",
//   defaultLocale: "en",
// });

const ratelimitPaths = ["/", "/results", "/api/vote"];

// * The function is of type NextMiddleware
export const middleware: NextMiddleware = async (req: NextRequest) => {
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
};

export const config = {
  matcher: [
    // * Match the root path
    "/",

    // * Match the internationalized pathnames
    // "/(en|ja)/:path*",
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|assets|about|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    // {
    //   source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
    //   has: [
    //     { type: "header", key: "next-router-prefetch" },
    //     { type: "header", key: "purpose", value: "prefetch" },
    //   ],
    // },

    // {
    //   source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
    //   has: [{ type: "header", key: "x-present" }],
    //   missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    // },
  ],
};
