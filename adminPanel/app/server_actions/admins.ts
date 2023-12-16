"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const createNewAdmin = async (adminData: {
  Name: string;
  Email: string;
  Image?: string;
}) => {
  try {
    const admin = await prisma.admin.create({
      data: {
        ...adminData,
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
  adminData: {
    Name: string;
    Email: string;
    Image?: string;
  }
) => {
  try {
    const admin = await prisma.admin.update({
      where: { id },
      data: {
        ...adminData,
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
