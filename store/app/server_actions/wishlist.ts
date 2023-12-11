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

// Get wishlist items
export const getWishlistItems = async (UserId: string, limit?: number) => {
  // Get the total count of wishlist items to use that in the navbar (eg: the user has 10 items in the wishlist, he will see only the last 7 and "+3 more")
  const totalCount = await prisma.whishListItem.count({
    where: {
      UserId,
    },
  });

  const wishlistItems = await prisma.whishListItem.findMany({
    where: {
      UserId,
    },
    take: limit ? limit : undefined,
    orderBy: {
      createdAt: "desc",
    },
    select: {
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

  return { wishlistItems, totalCount };
};

export const removeFromWishlist = async (ProductId: string) => {
  try {
    await prisma.whishListItem.delete({
      where: {
        ProductId,
      },
    });
    revalidatePath("/wishlist");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
