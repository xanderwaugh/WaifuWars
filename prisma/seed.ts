import { PrismaClient } from "@prisma/client";
import { ALL_WAIFUS, BROKEN_WAIFUS } from "../src/data/waifus";
import {
  fetchWaifuById,
  addWaifuToDB,
  fetchFromAnilist,
} from "../src/server/utils";

const prisma = new PrismaClient();

const checkDuplicates = () => {
  const DUPLICATE_WAIFUS = ALL_WAIFUS.filter(
    (w, i) => ALL_WAIFUS.indexOf(w) !== i,
  );
  if (DUPLICATE_WAIFUS.length > 0) {
    console.error("Duplicate Waifus Found", DUPLICATE_WAIFUS);
    process.exit(1);
  } else console.log("No Duplicate Waifus Found 🎉");
};

const patchNoImageProfiles = async () => {
  const waifusToPatch = await prisma.waifu.findMany({
    where: {
      imageLarge: {
        equals:
          "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg",
      },
    },
    select: { id: true, image: true },
  });

  console.log("Waifus to Patch:", waifusToPatch.length);

  const patches = [];

  for (const waifu of waifusToPatch) {
    const transaction = prisma.waifu.update({
      where: { id: waifu.id },
      data: { imageLarge: waifu.image },
    });
    patches.push(transaction);
  }
  await prisma.$transaction(patches);
  console.log("Waifus Patched 🎉");
};

const checkForRemovedWaifus = async (shouldRemove = false) => {
  const WAIFUS = await prisma.waifu.findMany({
    select: { id: true },
  });

  const waifusInDB = WAIFUS.map((w) => w.id);
  const removedWaifus = waifusInDB.filter((w) => !ALL_WAIFUS.includes(w));

  if (!removedWaifus.length) {
    console.log("No Waifus Need To Be Deleted 🎉");
    return;
  }
  console.error("Removed Waifus Found 😭", removedWaifus);
  // process.exit(1);

  if (shouldRemove) {
    await prisma.waifu.deleteMany({
      where: { id: { in: removedWaifus } },
    });
    console.log("Removed Waifus Deleted 🎉");
  }
};

const seedWaifusFromMAL = async () => {
  const WAIFUS = await prisma.waifu.findMany({
    select: { id: true },
  });

  const waifusInDB = WAIFUS.map((w) => w.id);
  const waifusToAdd = ALL_WAIFUS.filter((w) => !waifusInDB.includes(w));

  console.log("MAL Waifus to Add:", waifusToAdd);
  console.log("MAL Waifus to Add", waifusToAdd.length);

  const erroredWaifus: number[] = [];

  for (const waifuId of waifusToAdd) {
    await new Promise((r) => setTimeout(r, 800)); // Rate Limit
    const waifu = await fetchWaifuById(waifuId);
    if (!waifu) {
      erroredWaifus.push(waifuId);
      console.error("Error fetching waifu", waifuId);
      continue;
    }
    await addWaifuToDB(prisma, waifu);
    console.log("Added", waifu.name);
  }

  return erroredWaifus;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateWaifusFromAnilist = async () => {
  const WAIFUS = await prisma.waifu.findMany({
    select: { id: true, imageLarge: true, bio: true },
  });

  // * Array of waifus w/o imageLarge or bio in DB
  const preWaifusToUpdate = WAIFUS.filter((w) => !w.imageLarge || !w.bio);
  // ! Skip broken waifus
  const waifusToUpdate = preWaifusToUpdate.filter(
    (w) => !BROKEN_WAIFUS.includes(w.id),
  );

  console.log("Waifus to Anilist:", waifusToUpdate.length);
  const erroredWaifus: number[] = [];

  // * Do not exceed their ratelimit of 90 requests per minute
  for (const waifu of waifusToUpdate) {
    const [, anilistData] = await Promise.all([
      new Promise((r) => setTimeout(r, 1700)),
      fetchFromAnilist(waifu.id),
    ]);

    if (!anilistData) {
      erroredWaifus.push(waifu.id);
      console.error("Error fetching waifu", waifu.id);
      continue;
    }

    await prisma.waifu.update({
      where: { id: waifu.id },
      data: anilistData,
    });
    console.log("Added", waifu.id);
  }

  return erroredWaifus;
};

const forceMALforBrokenWaifus = async () => {
  // const broken =
  const transactions = [];
  for (const broken of BROKEN_WAIFUS) {
    await new Promise((r) => setTimeout(r, 800)); // Rate Limit
    const waifu = await fetchWaifuById(broken);
    if (!waifu) continue;
    transactions.push(
      prisma.waifu.update({
        where: { id: broken },
        data: {
          ...waifu,
          imageLarge: null,
          bio: null,
        },
      }),
    );
  }
  await prisma.$transaction(transactions);
};

const main = async () => {
  checkDuplicates();
  console.log("====================================\n");

  const shouldRemove = false;
  await checkForRemovedWaifus(shouldRemove);
  console.log("====================================\n");

  const malErrors = await seedWaifusFromMAL();
  console.log("MAL Errors:", malErrors.length);
  console.log("====================================\n");

  // const anilistErrors = await updateWaifusFromAnilist();
  // console.log("\nANILIST Errored Waifus", anilistErrors);
  // console.log("ANILIST Errors:", anilistErrors.length);

  await forceMALforBrokenWaifus();
  console.log("Done Forcing MAL For Broken Waifus 🎉");
  console.log("====================================\n");

  await patchNoImageProfiles();

  // * Happy Emoji Done
  console.log("✅ Done");
};

main().catch((_e) => {
  console.error(_e);
  process.exit(1);
});
