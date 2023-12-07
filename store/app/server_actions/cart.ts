"use server";
import { prisma } from "@/lib/prisma";

export const addToCart = async (ProductId: string, UserId: string) => {
  // Check if product is already in cart
  const cartItem = await prisma.cartItem.findUnique({
    where: {
      UserId,
      ProductId,
    },
  });
  if (cartItem) {
    // Increment quantity
    await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        Quantity: cartItem.Quantity + 1,
      },
    });
  }
  // Add the product to the cart if it doesn't exist
  else {
    await prisma.cartItem.create({
      data: {
        Product: {
          connect: {
            id: ProductId,
          },
        },
        User: {
          connect: {
            UserId,
          },
        },
      },
    });
  }
  return { success: true };
};
