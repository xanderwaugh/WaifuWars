import { z } from "zod";

import { voteSchema } from "./vote";
import { waifuSchema } from "./waifu";

const addVoteFnSchema = z.function(
  z.tuple([waifuSchema.shape.id, waifuSchema.shape.id], z.void()),
);

const sortSchema = z.enum(["sort", "perc"]);

const setSortFnSchema = z.function(z.tuple([sortSchema], z.void()));

export const contextSchema = z.object({
  numVotes: z.number().int().positive(),
  votes: z.array(voteSchema),
  addVote: addVoteFnSchema,
  sort: sortSchema,
  setSort: setSortFnSchema,
});

export type IWaifuContext = z.infer<typeof contextSchema>;
