"use server";
import { prisma } from "@/lib/prisma";

export const getProductData = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      Reviews: {
        select: {
          id: true,
          Comment: true,
          Rating: true,
          User: { select: { Name: true, Image: true } },
        },
      },
    },
  });
  return product;
};

export const getRelatedProducts = async (
  productId: string,
  productCategories: string[]
) => {
  const products = await prisma.product.findMany({
    where: {
      AND: [
        { CategoryIDs: { hasSome: productCategories } },
        { id: { not: productId } },
      ],
    },
    take: 10,
  });
  return products;
};

export const hasBoughtProduct = async (productId: string, UserId: string) => {
  const order = await prisma.order.count({
    where: {
      AND: [{ UserId }, { Product: { some: { id: productId } } }],
    },
  });
  return order > 0;
};

export const isFavorite = async (productId: string, UserId: string) => {
  const product = await prisma.whishListItem.count({
    where: { AND: [{ ProductId: productId }, { UserId }] },
  });
  return product > 0;
};
