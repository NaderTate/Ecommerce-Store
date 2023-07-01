import prisma from "./prisma";

export async function markAsComplete(id: string) {
  try {
    const product = await prisma.order.update({
      where: { id },
      data: {
        IsComplete: true,
        CompletedOn: new Date().toString(),
      },
    });
    return { product };
  } catch (error) {
    return { error };
  }
}
