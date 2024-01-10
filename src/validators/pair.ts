import { z } from "zod";
import { waifuSchema } from "./waifu";

export const pairSchema = z.object({
  waifu1: waifuSchema,
  waifu2: waifuSchema,
});

export type WaifuPair = z.infer<typeof pairSchema>;
