import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { getRandomWaifuPair } from "~/data/waifus";

import {
  fetchWaifuById,
  checkIfWaifuExists,
  addWaifuToDB,
} from "~/server/utils";

// https://docs.api.jikan.moe/
export const waifuRouter = createTRPCRouter({
  getWaifuPair: publicProcedure.query(async ({ ctx }) => {
    const [r1, r2] = getRandomWaifuPair();

    // * Check if waifu1 and waifu2 are in db
    let [waifu1, waifu2] = await Promise.all([
      checkIfWaifuExists(ctx.prisma, r1),
      checkIfWaifuExists(ctx.prisma, r2),
    ]);

    // * If not, add them to db
    if (!waifu1) {
      const waifu = await fetchWaifuById(r1);
      await addWaifuToDB(ctx.prisma, waifu);
      waifu1 = waifu;
    }
    if (!waifu2) {
      const waifu = await fetchWaifuById(r2);
      await addWaifuToDB(ctx.prisma, waifu);
      waifu2 = waifu;
    }

    return { waifu1, waifu2 };
  }),
  vote: publicProcedure
    .input(
      z.object({
        votedFor: z.number(),
        votedAgainst: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const voteInDB = await ctx.prisma.vote.create({
        data: {
          votedFor: { connect: { id: input.votedFor } },
          votedAgainst: { connect: { id: input.votedAgainst } },
        },
      });
      return { success: true, vote: voteInDB };
    }),
});
