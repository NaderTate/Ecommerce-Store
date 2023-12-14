"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(categoryData: {
  label: string;
  Image: string;
  Properties: Array<object>;
  ParentId: string | null;
}) {
  try {
    const x = new Date(Date.now());
    const y = x.getTime();
    const value = Math.floor(y + Math.random() * 200); // trying to generate a unique value, there's a better way to do this but who cares
    await prisma.category.create({
      data: {
        ...categoryData,
        value,
      },
    });
    revalidatePath("/categories");
    return { success: true };
  } catch (error) {
    return { error };
  }
}
export async function updateCategory(
  id: string,
  categoryData: {
    ParentId: string | null;
    label: string;
    Image: string;
    Properties: object[];
  }
) {
  try {
    await prisma.category.update({
      where: { id },
      data: {
        ...categoryData,
      },
    });
    revalidatePath("/categories");
    return { success: true };
  } catch (error) {
    return { error };
  }
}
export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/categories");

    return { success: true };
  } catch (error) {
    return { error };
  }
}
