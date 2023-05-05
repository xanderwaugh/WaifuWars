import { createTRPCRouter } from "~/server/api/trpc";

import { waifuRouter } from "~/server/api/routers/waifu";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  waifu: waifuRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
