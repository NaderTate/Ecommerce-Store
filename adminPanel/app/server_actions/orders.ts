"use server";
import prisma from "@/lib/prisma";

export async function markOrderAsComplete(id: string) {
  try {
    await prisma.order.update({
      where: { id },
      data: {
        IsComplete: true,
        CompletedOn: new Date().toString(),
      },
    });
    return { success: true };
  } catch (error) {
    return { error };
  }
}
