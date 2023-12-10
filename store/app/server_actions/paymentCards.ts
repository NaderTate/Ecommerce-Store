"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createNewCard = async (
  userId: string,
  data: {
    CardNumber: string;
    HolderName: string;
    Expiry: string;
    CVV: string;
    CardType: string;
  }
) => {
  try {
    await prisma.card.create({
      data: {
        ...data,
        UserId: userId,
      },
    });
    revalidatePath("/account");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const updateCard = async (
  cardId: string,
  data: {
    CardNumber: string;
    HolderName: string;
    Expiry: string;
    CVV: string;
    CardType: string;
  }
) => {
  try {
    await prisma.card.update({
      where: { id: cardId },
      data: { ...data },
    });
    revalidatePath("/account");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
