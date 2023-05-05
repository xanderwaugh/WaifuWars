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

interface Waifu {
  id: number;
  url: string;
  name: string;
  name_kanji: string | null;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

type WaifusQueryResult = {
  _count: {
    VoteFor: number;
    VoteAgainst: number;
  };
  id: number;
  name: string;
  image: string;
  url: string;
}[];
