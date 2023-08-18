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

interface Vote {
  id: string;
  createdAt: Date;
  votedForId: number;
  votedAgainstId: number;
}

interface Waifu {
  id: number;
  url: string;
  name: string;
  name_kanji: string | null;
  image: string;
  bio: string | null;
  imageLarge: string | null;
  imageCustom: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface PrismaWaifusQuery {
  _count: {
    VoteFor: number;
    VoteAgainst: number;
  };
  id: number;
  url: string;
  name: string;
  image: string;
  imageLarge: string | null;
  bio: string | null;
  imageCustom: string | null;
}

type PrismaWaifuQNoBio = Omit<PrismaWaifusQuery, "bio">;

type WaifusQueryResult = PrismaWaifuQNoBio[];
