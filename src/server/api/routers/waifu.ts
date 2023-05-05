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
  results: publicProcedure
    .input(
      z.object({
        sortedBy: z.enum(["votes", "perc"]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const waifuOrdered = await ctx.prisma.waifu.findMany({
        orderBy: { VoteFor: { _count: "desc" } },
        select: {
          id: true,
          name: true,
          image: true,
          url: true,
          _count: { select: { VoteFor: true, VoteAgainst: true } },
        },
      });

      let sorted: WaifusQueryResult = [];

      if (input.sortedBy === "votes") {
        // * Sort by VoteFor
        sorted = waifuOrdered.sort(
          (a, b) => b._count.VoteFor - a._count.VoteFor,
        );
      } else if (input.sortedBy === "perc") {
        // * Sort by Percent
        sorted = waifuOrdered.sort(
          (a, b) =>
            b._count.VoteFor / (b._count.VoteFor + b._count.VoteAgainst) -
            a._count.VoteFor / (a._count.VoteFor + a._count.VoteAgainst),
        );
      }

      return { waifus: sorted };
    }),
});
