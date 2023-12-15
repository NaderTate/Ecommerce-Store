"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    revalidatePath("/users");
    return { success: true };
  } catch (error) {
    console.error(error);
  }
};
