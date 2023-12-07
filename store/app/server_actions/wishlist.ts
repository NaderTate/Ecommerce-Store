"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const addToWishlist = async (ProductId: string, UserId: string) => {
  try {
    // Check if product is already in wishlist
    const wishlistItem = await prisma.whishListItem.findUnique({
      where: {
        UserId,
        ProductId,
      },
    });
    if (wishlistItem) {
      //  remove from wishlist if it exists
      await prisma.whishListItem.delete({
        where: {
          id: wishlistItem.id,
        },
      });
      revalidatePath("/products");
      return { deleted: true };
    }
    // Add the product to the wishlist
    else {
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
      revalidatePath("/products");
      return { added: true };
    }
  } catch (error) {
    return { success: false, error };
  }
};
