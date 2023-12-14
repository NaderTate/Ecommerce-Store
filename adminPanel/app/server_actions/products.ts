"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createProduct = async (productData: {
  Title: string;
  Price: number;
  Images: Array<{ id: string; img: string }>;

  Description: string;
  CategoryIDs: Array<string>;
  Colors: Array<string>;
  Properties: object[];
}) => {
  try {
    await prisma.product.create({
      data: {
        ...productData,
        Rating: 3.5,
        Categories: {
          connect: productData.CategoryIDs.map((category) => ({
            id: category,
          })),
        },
        mainImg: productData?.Images[0]?.img,
        secondImage: productData?.Images[1]?.img,
      },
    });
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const updateProduct = async (
  id: string,
  productData: {
    Title: string;
    Price: number;
    Images: Array<{ id: string; img: string }>;
    Description: string;
    CategoryIDs: Array<string>;
    Colors: Array<string>;
    Properties: object[];
  }
) => {
  try {
    // remove old categories
    await prisma.product.update({
      where: { id },
      data: {
        Categories: { set: [] },
      },
    });
    await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        Categories: {
          connect: productData.CategoryIDs.map((category) => ({
            id: category,
          })),
        },
        mainImg: productData?.Images[0]?.img,
        secondImage: productData?.Images[1]?.img,
      },
    });
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
