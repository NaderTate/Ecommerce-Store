"use server";
import { prisma } from "@/lib/prisma";

export const search = async (searchQuery: string) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          Title: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
        {
          Description: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
      ],
    },
    take: 10,
    select: {
      Title: true,
      Price: true,
      mainImg: true,
      secondImage: true,
      id: true,
    },
  });
  const categories = await prisma.category.findMany({
    where: {
      OR: [
        {
          label: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
      ],
    },
    take: 5,
    select: {
      label: true,
      id: true,
      Image: true,
    },
  });
  return { products, categories };
};
