"use server";
import { prisma } from "@/lib/prisma";

export const getProductsByCategoryID = async (
  categories: string[],
  limit: number
) => {
  const products = await prisma.product.findMany({
    where: {
      Categories: {
        some: {
          id: {
            in: categories,
          },
        },
      },
    },
    take: limit,
    select: {
      id: true,
      mainImg: true,
      secondImage: true,
      Title: true,
      Price: true,
    },
  });
  return products;
};

// Get the latest products
export const getLatestProducts = async (limit?: number) => {
  const products = await prisma.product.findMany({
    take: limit ? limit : 10,
    select: {
      id: true,
      mainImg: true,
      secondImage: true,
      Title: true,
      Price: true,
    },
  });
  return products;
};
