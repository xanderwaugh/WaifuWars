import { PrismaClient } from "@prisma/client";
import { ALL_WAIFUS } from "../src/data/waifus";
import { fetchWaifuById, addWaifuToDB } from "../src/server/utils";

const prisma = new PrismaClient();

const main = async () => {
  const DUPLICATE_WAIFUS = ALL_WAIFUS.filter(
    (w, i) => ALL_WAIFUS.indexOf(w) !== i,
  );
  if (DUPLICATE_WAIFUS.length > 0) {
    console.error("Duplicate Waifus Found", DUPLICATE_WAIFUS);
    process.exit(1);
  }

  const WAIFUS = await prisma.waifu.findMany({
    select: { id: true },
  });

  const waifusInDB = WAIFUS.map((w) => w.id);
  const waifusToAdd = ALL_WAIFUS.filter((w) => !waifusInDB.includes(w));

  console.log("waifusToAdd", waifusToAdd);
  console.log("waifusToAdd.length", waifusToAdd.length);
  const erroredWaifus = [];

  for (const waifuId of waifusToAdd) {
    try {
      const waifu = await fetchWaifuById(waifuId);
      await addWaifuToDB(prisma, waifu);
      console.log("Added", waifu.name);
    } catch (error) {
      erroredWaifus.push(waifuId);
      console.error("Error fetching waifu", waifuId, error);
      // await new Promise((r) => setTimeout(r, 1000));
      continue;
    }
    // await new Promise((r) => setTimeout(r, 350));
  }

  console.log("Errored Waifus", erroredWaifus);
  console.log("Errored Waifus Length", erroredWaifus.length);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
