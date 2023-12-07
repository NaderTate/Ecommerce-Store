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
