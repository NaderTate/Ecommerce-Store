import prisma from "./prisma";
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

export async function createCategory(
  label: string,

  Image: string,
  Properties: Array<object>,
  Parent: string
) {
  try {
    const count = (await prisma.category.findMany()).length;
    const category = await prisma.category.create({
      data: {
        label,
        value: count + 1,
        Image,
        Properties,
        Parent,
      },
    });
    return { category };
  } catch (error) {
    return { error };
  }
}
export async function updateCategory(
  id: string,
  label: string,
  Image: string,
  Properties: Array<object>,
  Parent: string
) {
  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        label,
        Image,
        Properties,
        Parent,
      },
    });
    return { category };
  } catch (error) {
    return { error };
  }
}
export async function deleteCategory(id: string) {
  try {
    const category = await prisma.category.delete({
      where: { id },
    });
    return { category };
  } catch (error) {
    return { error };
  }
}
