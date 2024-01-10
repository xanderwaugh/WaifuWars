import { z } from "zod";

export const voteSchema = z.object({
  id: z.string().min(1),
  createdAt: z.date(),
  votedForId: z.number().int().positive(),
  votedAgainstId: z.number().int().positive(),
});

export const votesSchema = z.array(voteSchema);
