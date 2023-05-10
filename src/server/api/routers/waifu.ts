import { z } from "zod";
import { createTRPCRouter, ratelimitProcedure } from "~/server/api/trpc";

import { type Waifu, type WaifusQueryResult } from "~/types";
import { getRandomWaifuPair } from "~/data/helpers";
import { sortByVotes } from "~/data/sort";

// https://docs.api.jikan.moe/
// https://anilist.co/character/4963
// https://anilist.github.io/ApiV2-GraphQL-Docs/

export const waifuRouter = createTRPCRouter({
  getWaifuPair: ratelimitProcedure.query(async ({ ctx }) => {
    const [w1, w2] = getRandomWaifuPair();
    const [waifu1, waifu2] = await ctx.prisma.waifu.findMany({
      where: { id: { in: [w1, w2] } },
    });
    if (!waifu1 || !waifu2) throw new Error("Waifu pair not found");

    return { waifu1, waifu2 } satisfies {
      waifu1: Waifu;
      waifu2: Waifu;
    };
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
  results: ratelimitProcedure.query(async ({ ctx }) => {
    const waifus: WaifusQueryResult = await ctx.prisma.waifu.findMany({
      orderBy: { VoteFor: { _count: "desc" } },
      select: {
        id: true,
        name: true,
        image: true,
        url: true,
        imageLarge: true,
        imageCustom: true,
        bio: true,
        _count: { select: { VoteFor: true, VoteAgainst: true } },
      },
    });

    // * Default Sort by Votes
    const sorted = sortByVotes(waifus);
    return sorted;
  }),
});
