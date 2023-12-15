"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markOrderAsComplete(id: string) {
  try {
    await prisma.order.update({
      where: { id },
      data: {
        IsComplete: true,
        CompletedOn: new Date().toString(),
      },
    });
    revalidatePath("/orders");
    return { success: true };
  } catch (error) {
    return { error };
  }
}
