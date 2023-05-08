/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client";
import { ALL_WAIFUS, CUSTOM_PROPS, SKIP_ANILIST } from "../src/data/waifus";
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

  console.log("MAL Waifus to Add:", waifusToAdd.length);
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
    console.log("MAL Added:", waifu.name);
  }

  return erroredWaifus;
};

const updateWaifusFromAnilist = async () => {
  const WAIFUS = await prisma.waifu.findMany({
    select: { id: true, imageLarge: true, bio: true },
  });

  // * Array of waifus w/o imageLarge or bio in DB
  const waifusMissingInfo = WAIFUS.filter((w) => !w.imageLarge || !w.bio);

  // * Skip Broken Waifus
  const waifusToUpdate = waifusMissingInfo.filter(
    (w) => !SKIP_ANILIST.includes(w.id),
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
    await prisma.waifu.upsert({
      where: { id: waifu.id },
      create: {
        id: waifu.id,
        image: anilistData.imageLarge,
        ...anilistData,
      },
      update: { image: anilistData.imageLarge },
    });
    console.log("Added", waifu.id);
  }

  return erroredWaifus;
};

const forceMALforBrokenWaifus = async () => {
  for (const broken of SKIP_ANILIST) {
    await new Promise((r) => setTimeout(r, 800));
    const waifu = await fetchWaifuById(broken);
    if (!waifu || !broken) continue;
    console.log("Force MAL for Broken Waifu:", broken);
    await prisma.waifu.upsert({
      where: { id: broken }, // <-- Causing Error
      create: { ...waifu, imageLarge: null, bio: null },
      update: { ...waifu, imageLarge: null, bio: null },
    });
  }
  // await prisma.$transaction(transactions);
};

const customPatches = async () => {
  const customIDs = CUSTOM_PROPS.map((w) => w.id);
  // * Select only custom waifus
  const waifusInDB = await prisma.waifu.findMany({
    where: { id: { in: customIDs } },
    select: { id: true },
  });
  console.log("Waifus w/ Custom Props:", waifusInDB.length);

  for (const dbWaifu of waifusInDB) {
    const custWaifu = CUSTOM_PROPS.find((w) => w.id === dbWaifu.id);
    if (!custWaifu) continue;
    try {
      await prisma.waifu.update({
        where: { id: dbWaifu.id },
        data: { imageCustom: custWaifu.image },
      });
    } catch (error) {
      console.error("Error updating waifu", dbWaifu.id);
    }
  }
};

const main = async () => {
  checkDuplicates();
  console.log("\n====================================\n");

  const shouldRemove = true;
  await checkForRemovedWaifus(shouldRemove);
  console.log("\n====================================\n");

  const malErrors = await seedWaifusFromMAL();
  console.log("MAL Errors:", malErrors.length);
  console.log("\n====================================\n");

  // const anilistErrors = await updateWaifusFromAnilist();
  // console.log("\nANILIST Errored Waifus", anilistErrors);
  // console.log("ANILIST Errors:", anilistErrors.length);

  await forceMALforBrokenWaifus();
  console.log("Done Forcing MAL For Broken Waifus 🎉\n");
  console.log("\n====================================\n");

  // * Custom Patches
  await customPatches();
  console.log("Done Custom Patches 🎉\n");
  console.log("\n====================================\n");

  // * Happy Emoji Done
  console.log("✅ Done");
};

main().catch((_e) => {
  console.error(_e);
  process.exit(1);
});

// Older Code
const fixEmptyImages = async () => {
  const waifusToPatch = await prisma.waifu.findMany({
    where: { imageLarge: { equals: "" } },
    select: { id: true },
  });
  console.log("Fixing Empty Images:", waifusToPatch.length);
  const transactions = [];
  for (const waifu of waifusToPatch) {
    transactions.push(
      prisma.waifu.update({
        where: { id: waifu.id },
        data: { imageLarge: null },
      }),
    );
  }
  await prisma.$transaction(transactions);
};

const defAniImage =
  "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg";

const patchNoImageProfiles = async () => {
  const waifusToPatch = await prisma.waifu.findMany({
    where: { imageLarge: { equals: defAniImage } },
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
