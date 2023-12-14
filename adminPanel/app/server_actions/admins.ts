"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const createNewAdmin = async (
  Name: string,
  Email: string,
  Image?: string
) => {
  try {
    const admin = await prisma.admin.create({
      data: {
        Name,
        Email,
        Image,
      },
    });
    revalidatePath("/admins");
    return { success: true };
  } catch (error) {
    return { error };
  }
};

export const updateAdmin = async (
  id: string,
  Name: string,
  Email: string,
  Image?: string
) => {
  try {
    const admin = await prisma.admin.update({
      where: { id },
      data: {
        Name,
        Email,
        Image,
      },
    });
    revalidatePath("/admins");
    return { success: true };
  } catch (error) {
    return { error };
  }
};

export const deleteAdmin = async (id: string) => {
  try {
    const admin = await prisma.admin.delete({
      where: { id },
    });
    revalidatePath("/admins");
    return { success: true };
  } catch (error) {
    return { error };
  }
};
