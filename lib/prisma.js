import { PrismaClient } from "@prisma/client";

// Ensure only one instance of PrismaClient is used in development
if (!global.prisma) {
  global.prisma = new PrismaClient();
}

export const db = global.prisma;
