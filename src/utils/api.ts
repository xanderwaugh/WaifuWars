/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 * We also create a few inference helpers for input and output types.
 */
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

import { type AppRouter } from "~/server/api/root";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

/** A set of type-safe react-query hooks for your tRPC API. */
export const api = createTRPCNext<AppRouter>({
  config({ ctx }) {
    if (typeof window !== "undefined") {
      return {
        transformer: superjson,
        links: [
          httpBatchLink({ url: "/api/trpc" }),
          loggerLink({
            enabled: (opts) =>
              process.env.NODE_ENV === "development" ||
              (opts.direction === "down" && opts.result instanceof Error),
          }),
        ],
      };
    }

    return {
      /**
       * Transformer used for data de-serialization from the server.
       * @see https://trpc.io/docs/data-transformers
       */
      transformer: superjson,
      /**
       * Links used to determine request flow from client to server.
       * @see https://trpc.io/docs/links
       */
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            if (!ctx?.req?.headers) return {};
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { connection: _connection, ...headers } = ctx.req.headers;
            return headers;
          },
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchInterval: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            retry: 1, // * Retry only once
            retryDelay: 1000 * 2, // * Retry After 2 Seconds
          },
        },
      },
      // abortOnUnmount: true,
    };
  },
  /**
   * Whether tRPC should await queries when server rendering pages.
   *
   * @see https://trpc.io/docs/nextjs#ssr-boolean-default-false
   */
  ssr: true,
  // responseMeta({ clientErrors }) {
  //   if (clientErrors.length) {
  //     // propagate http first error from API calls
  //     return { status: clientErrors[0]?.data?.httpStatus ?? 500 };
  //   }
  //   // cache request for 1 day + revalidate once every second
  //   const HOUR_IN_SECS = 60 * 60;
  //   return {
  //     headers: {
  //       "cache-control": `s-maxage=1, stale-while-revalidate=${HOUR_IN_SECS}`,
  //     },
  //   };
  // },
});

import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
/**
 * Inference helper for inputs.
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;
/**
 * Inference helper for outputs.
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
