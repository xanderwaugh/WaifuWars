import { env } from "~/env.mjs";
import { PrismaClient } from "@prisma/client";

function createPrisma() {
  return new PrismaClient({
    log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

type MyPrisma = ReturnType<typeof createPrisma>;

const globalForPrisma = globalThis as unknown as {
  prisma: MyPrisma | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
