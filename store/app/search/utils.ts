"use server";
import { prisma } from "@/lib/prisma";
import { select } from "@nextui-org/react";
export const getSearchResults = async (
  searchQuery: string,
  pagination?: { limit: number; skip: number },
  filters?: { minPrice?: number; maxPrice?: number; minRating?: number },
  sortBy?: {
    price?: "asc" | "desc" | undefined;
    id?: "desc" | undefined;
  }
) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          Title: { contains: searchQuery, mode: "insensitive" },
        },
        {
          Categories: {
            some: {
              label: searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1),
            },
          },
        },
        { Description: { contains: searchQuery, mode: "insensitive" } },
      ],
      AND: [
        { Price: { gte: filters?.minPrice ?? undefined } },
        { Price: { lte: filters?.maxPrice ?? undefined } },
        { Rating: { gte: filters?.minRating ?? undefined } },
      ],
    },
    select: {
      id: true,
      mainImg: true,
      secondImage: true,
      Title: true,
      Price: true,
    },
    orderBy: {
      Price: sortBy?.price ?? undefined,
      id: sortBy?.id ?? undefined,
    },
    take: pagination?.limit ?? undefined,
    skip: pagination?.skip ?? undefined,
  });
  const count = await prisma.product.count({
    where: {
      OR: [
        {
          Title: { contains: searchQuery, mode: "insensitive" },
        },
        {
          Categories: {
            some: {
              label: searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1),
            },
          },
        },
        { Description: { contains: searchQuery, mode: "insensitive" } },
      ],
      AND: [
        { Price: { gte: filters?.minPrice ?? undefined } },
        { Price: { lte: filters?.maxPrice ?? undefined } },
        { Rating: { gte: filters?.minRating ?? undefined } },
      ],
    },
  });
  const highestPrice = await prisma.product.findFirst({
    select: { Price: true },
    where: {
      OR: [
        {
          Title: { contains: searchQuery, mode: "insensitive" },
        },
        {
          Categories: {
            some: {
              label: searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1),
            },
          },
        },
        { Description: { contains: searchQuery, mode: "insensitive" } },
      ],
      AND: [
        { Price: { gte: filters?.minPrice ?? undefined } },
        { Price: { lte: filters?.maxPrice ?? undefined } },
        { Rating: { gte: filters?.minRating ?? undefined } },
      ],
    },
    orderBy: {
      Price: "desc",
    },
  });
  const lowestPrice = await prisma.product.findFirst({
    select: { Price: true },
    where: {
      OR: [
        {
          Title: { contains: searchQuery, mode: "insensitive" },
        },
        {
          Categories: {
            some: {
              label: searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1),
            },
          },
        },
        { Description: { contains: searchQuery, mode: "insensitive" } },
      ],
      AND: [
        { Price: { gte: filters?.minPrice ?? undefined } },
        { Price: { lte: filters?.maxPrice ?? undefined } },
        { Rating: { gte: filters?.minRating ?? undefined } },
      ],
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

export const getCurrentCategory = async (searchQuery: string) => {
  const category = await prisma.category.findFirst({
    where: {
      label: { contains: searchQuery, mode: "insensitive" },
    },
    select: { id: true },
  });
  return category?.id;
};
