"use server";

import "server-only";

import type { WaifuPair } from "~/validators/pair";
import { getRandomWaifuPair } from "~/data/helpers";
import { prisma } from "./db";

export async function getWaifuPair() {
  // console.count("getWaifuPair");
  // await new Promise((r) => setTimeout(r, 1000));

  const [w1, w2] = getRandomWaifuPair();
  const [waifu1, waifu2] = await prisma.waifu.findMany({
    where: { id: { in: [w1, w2] } },
  });

  if (!waifu1 || !waifu2) {
    throw new Error("Waifu not found");
  }

  return { waifu1, waifu2 } satisfies WaifuPair;
}

interface VoteInput {
  selected: number;
  against: number;
}

export async function voteForPair(input: VoteInput) {
  const voteInDB = await prisma.vote.create({
    data: {
      votedForId: input.selected,
      votedAgainstId: input.against,
    },
  });
  // console.table(voteInDB);

  return { success: true, vote: voteInDB };
}
