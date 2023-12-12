"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
    cacheStrategy: {
      ttl: 60 * 60 * 24, // Store the results in cache for 24 hours
      swr: 60, // after the 24 hours, you may get the cached results for 60 seconds while the new results are being fetched in the background
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

export const addReview = async (
  UserId: string,
  ProductId: string,
  Rating: number,
  Comment: string
) => {
  try {
    const ratings: Array<number> = [];
    ratings.push(Rating);
    const oldReviews = await prisma.review.findMany({
      where: { ProductId },
      select: { Rating: true },
    });
    oldReviews.map(({ Rating }) => ratings.push(Rating));
    const average = (array: Array<number>) =>
      array.reduce((a, b) => a + b) / array.length;
    const newRating = average(ratings);
    await prisma.product.update({
      where: { id: ProductId },
      data: {
        Rating: Math.round(newRating * 10) / 10,
        Reviews: {
          create: {
            Rating,
            Comment,
            User: { connect: { UserId } },
          },
        },
      },
    });
    revalidatePath("/");
  } catch (error) {
    return { error };
  }
};

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
