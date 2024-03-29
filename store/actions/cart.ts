"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Add to cart
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
    revalidatePath("/");
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
    revalidatePath("/");
  }
  return { success: true };
};

// Get cart items
export const getCartItems = async (UserId: string, limit?: number) => {
  // Get the total count of cart items to use that in the navbar (eg: the user has 10 items in the cart, he will see only the last 7 and "+3 more")
  const totalCount = await prisma.cartItem.count({
    where: {
      UserId,
    },
  });

  const cartItems = await prisma.cartItem.findMany({
    where: {
      UserId,
    },
    take: limit ? limit : undefined,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      Quantity: true,
      Product: {
        select: {
          id: true,
          mainImg: true,
          secondImage: true,
          Title: true,
          Price: true,
        },
      },
    },
  });
  // Calculate the total price of the cart
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.Quantity * item.Product.Price;
  });
  return { cartItems, totalCount, totalPrice: Number(totalPrice.toFixed(2)) };
};

// Update the quantity of an item in the cart
export const updateItemQuantity = async (itemId: string, quantity: number) => {
  await prisma.cartItem.update({
    where: {
      id: itemId,
    },
    data: {
      Quantity: quantity,
    },
  });
  revalidatePath("/cart");
  return { success: true };
};
// Remove item from the cart
export const removeFromCart = async (itemId: string) => {
  await prisma.cartItem.delete({
    where: {
      id: itemId,
    },
  });
  revalidatePath("/cart");
  return { success: true };
};

export const saveToLater = async (
  UserId: string,
  ProductId: string,
  cartItemId: string
) => {
  // Add the product to the wishlist
  await prisma.whishListItem.create({
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
  // Remove the product from the cart
  await prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });
  revalidatePath("/cart");
  return { success: true };
};
