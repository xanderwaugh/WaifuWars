import { z } from "zod";

const stringToDate = (str: string) => new Date(str);

export const waifuSchema = z.object({
  id: z.number().int().positive(),
  url: z.string().min(1),
  name: z.string().min(1),
  name_kanji: z.string().nullable(),
  image: z.string().min(1),
  bio: z.string().nullable(),
  imageLarge: z.string().nullable(),
  imageCustom: z.string().nullable(),
  createdAt: z.string().transform(stringToDate),
  updatedAt: z.string().transform(stringToDate),
});

export type Waifu = z.infer<typeof waifuSchema>;
