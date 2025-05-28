import { Prisma, PrismaClient } from "@prisma/client";

import { env } from "../env";

const DB_URL = env.DATABASE_URL;
const IS_DEV = env.NODE_ENV === "development";

if (!DB_URL) {
  throw new Error("DATABASE_URL is not set");
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: IS_DEV ? ["error", "warn"] : ["error"],
    errorFormat: "pretty",
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

declare const globalThis: {
  prismaGlobal: PrismaClientSingleton | undefined;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
if (env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export { prisma, Prisma };
export default prisma;
