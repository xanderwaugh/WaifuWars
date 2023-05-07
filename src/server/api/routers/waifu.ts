import { z } from "zod";
import { createTRPCRouter, ratelimitProcedure } from "~/server/api/trpc";

import { getRandomWaifuPair } from "~/data/waifus";

// https://docs.api.jikan.moe/
// https://anilist.co/character/4963
// https://anilist.gitbook.io/anilist-apiv2-docs/overview/resources-and-recommended-reading
// https://anilist.github.io/ApiV2-GraphQL-Docs/

export const waifuRouter = createTRPCRouter({
  getWaifuPair: ratelimitProcedure.query(async ({ ctx }) => {
    const [w1, w2] = getRandomWaifuPair();

    const [waifu1, waifu2] = await ctx.prisma.waifu.findMany({
      where: { id: { in: [w1, w2] } },
    });

    if (!waifu1 || !waifu2) throw new Error("Waifu pair not found");

    return { waifu1, waifu2 } as { waifu1: Waifu; waifu2: Waifu };
  }),
  vote: ratelimitProcedure
    .input(
      z.object({
        votedFor: z.number(),
        votedAgainst: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const voteInDB = await ctx.prisma.vote.create({
        data: {
          votedForId: input.votedFor,
          votedAgainstId: input.votedAgainst,
        },
      });
      return { success: true, vote: voteInDB };
    }),
});
