"use server";
import { prisma } from "@/lib/prisma";

// Get category products
export const getCategoryProducts = async (
  categoryId: string,
  pagination?: { limit: number; skip: number },
  filters?: { minPrice?: number; maxPrice?: number; minRating?: number },
  sortBy?: {
    price?: "asc" | "desc" | undefined;
    id?: "asc" | "desc" | undefined;
  }
) => {
  // This is the main request to get the products, it returns a certain number of products based on the filters and pagination.
  const products = await prisma.product.findMany({
    where: {
      CategoryIDs: {
        has: categoryId,
      },
      Price: {
        gte: filters?.minPrice ?? undefined,
        lte: filters?.maxPrice ?? undefined,
      },
      Rating: {
        gte: filters?.minRating ?? undefined,
      },
    },
    orderBy: {
      Price: sortBy?.price ?? undefined,
      id: sortBy?.id ?? undefined,
    },
    take: pagination?.limit ?? undefined,
    skip: pagination?.skip ?? undefined,
  });
  //   I have to make another request to get the total count of products that match the fileters, prisma doesn't have a way to do this in one request yet...
  const count = await prisma.product.count({
    where: {
      CategoryIDs: {
        has: categoryId,
      },
      Price: {
        gte: filters?.minPrice ?? undefined,
        lte: filters?.maxPrice ?? undefined,
      },
      Rating: {
        gte: filters?.minRating ?? undefined,
      },
    },
  });
  //   I have to make another request to get the cheapest and most expensive products that match the fileters, the first request only returns a certain number of products, there's no guranatee that the most expensive or cheapest products will be in that list.
  // I use these values to calculate the average price range of the results which is used in the price filter.
  const highestPrice = await prisma.product.findFirst({
    select: { Price: true },
    where: {
      CategoryIDs: {
        has: categoryId,
      },
      Price: {
        gte: filters?.minPrice ?? undefined,
        lte: filters?.maxPrice ?? undefined,
      },
      Rating: {
        gte: filters?.minRating ?? undefined,
      },
    },
    orderBy: {
      Price: "desc",
    },
  });
  const lowestPrice = await prisma.product.findFirst({
    select: { Price: true },
    where: {
      CategoryIDs: {
        has: categoryId,
      },
      Price: {
        gte: filters?.minPrice ?? undefined,
        lte: filters?.maxPrice ?? undefined,
      },
      Rating: {
        gte: filters?.minRating ?? undefined,
      },
    },
    orderBy: {
      Price: "asc",
    },
  });
  return {
    products,
    count,
    highestPrice: highestPrice?.Price as number,
    lowestPrice: lowestPrice?.Price as number,
  };
};

export const calculatePriceFilter = (
  highestPrice: number,
  lowestPrice: number,
  filterLength: number = 5
) => {
  // This function calculates the price range of the results, it returns an array of numbers that represent the price range, the array is used to create the price filter.
  const priceRange = Math.floor((highestPrice - lowestPrice) / filterLength);
  const priceFilter = [];
  for (let i = 0; i < filterLength; i++) {
    priceFilter.push(Math.floor(lowestPrice + priceRange * i));
  }
  return priceFilter;
};

// This function finds similar categories to the current one.
// for example, if the current category is "laptops", it will return "mobiles", "power banks", "tablets", etc...
// This is used in the "Discover more" section in the sidebar.
export const getSimilarCategories = async (categoryId: string) => {
  // Initialize the array that will hold the similar categories.
  let similarCategories: Array<{ id: string; label: string }> = [];
  // The idea behind this is to get the category info, if this category is a parent, then get all of it's children, if it's a child, then get all of it's siblings.
  const categoryInfo = await prisma.category.findUnique({
    where: { id: categoryId },
    select: {
      id: true,
      label: true,
      Parent: {
        select: {
          children: { select: { id: true, label: true } },
          label: true,
          id: true,
        },
      },
      children: { select: { id: true, label: true } },
      ParentId: true,
    },
  });

  // If the category has a parent, then it's a child, so we push the parent and all of it's children to the array.
  if (categoryInfo?.Parent) {
    similarCategories.push({
      id: categoryInfo.Parent?.id,
      label: categoryInfo.Parent?.label,
    });
    categoryInfo.Parent?.children.map(({ id, label }) =>
      similarCategories.push({ id, label })
    );
  }
  // If it doesn't have a parent, then it's a parent, so we push it and all of it's children to the array.
  else {
    similarCategories.push({
      id: categoryInfo?.id as string,
      label: categoryInfo?.label as string,
    });
    categoryInfo?.children.map(({ id, label }) =>
      similarCategories.push({ id, label })
    );
  }
  return similarCategories;
};
