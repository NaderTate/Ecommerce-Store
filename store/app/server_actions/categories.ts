"use server";
import { prisma } from "@/lib/prisma";

// get the latest categries
export const getLatestCategories = async (limit?: number) => {
  const categories = await prisma.category.findMany({
    take: limit ? limit : 10,
    select: {
      id: true,
      label: true,
      Image: true,
    },
  });
  return categories;
};
