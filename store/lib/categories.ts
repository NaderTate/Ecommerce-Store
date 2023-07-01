import { prisma } from "./prisma";
export async function getCategoryById(id: string) {
  try {
    const category = await prisma.category.findUnique({ where: { id } });
    return { category };
  } catch (error) {
    return { error };
  }
}
export async function getCategories(sk: number, take: number) {
  // sk: number of current page
  try {
    const count = await prisma.category.count();
    const categories = await prisma.category.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
      take,
      skip: (sk - 1) * take,
    });
    return { categories, count };
  } catch (error) {
    return { error };
  }
}
