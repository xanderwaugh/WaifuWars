import { axios } from "./axios";
import { type PrismaClient } from "@prisma/client";

// Prisma Seed
type Waifu = {
  id: number;
  url: string;
  name: string;
  name_kanji: string | null;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

interface RandomWaifu {
  data: {
    mal_id: number;
    url: string;
    images: {
      jpg: { image_url: string; small_image_url?: string };
      webp: { image_url: string; small_image_url?: string };
    };
    name: string;
    name_kanji: string;
    nicknames: string[];
    favorites: number;
    about: string;
  };
}

// * Convert Fetched RandomWaifu to Waifu
export const convertWaifu = (waifu: RandomWaifu) =>
  ({
    id: waifu.data.mal_id,
    url: waifu.data.url,
    name: waifu.data.name,
    name_kanji: waifu.data.name_kanji,
    image: waifu.data.images.jpg.image_url,
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies Waifu);

// * Fetch Waifu by ID
export const fetchWaifuById = async (id: number) => {
  const { data } = await axios.get<RandomWaifu>(
    `https://api.jikan.moe/v4/characters/${id}`,
  );
  return convertWaifu(data);
};

// * Fetch Random Waifu
export const fetchRandomWaifu = async () => {
  const { data } = await axios.get<RandomWaifu>(
    "https://api.jikan.moe/v4/random/characters",
  );
  return convertWaifu(data);
};

// * Check if Waifu Exists in Database
export const checkIfWaifuExists = async (
  prisma: PrismaClient,
  waifuId: number,
) => {
  const result = await prisma.waifu.findUnique({
    where: { id: waifuId },
  });
  return result;
};

// * Add Waifu to Database
export const addWaifuToDB = async (prisma: PrismaClient, waifu: Waifu) => {
  const result = await prisma.waifu.create({
    data: {
      id: waifu.id,
      url: waifu.url,
      name: waifu.name,
      name_kanji: waifu.name_kanji,
      image: waifu.image,
    },
  });
  return result;
};
