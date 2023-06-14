import prisma from "./prisma";

export async function getProducts(sk: number, take: number) {
  try {
    const count = await prisma.product.count();
    const products = await prisma.product.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
      take,
      skip: (sk - 1) * take,
    });
    return { products, count };
  } catch (error) {
    return { error };
  }
}

export async function createProduct(
  Title: string,
  Price: number,
  Images: Array<object>,
  mainImg: string,
  Description: string,
  Reviews: Array<object>,
  Categories: Array<string>,
  Colors: Array<string>,
  Properties: object
) {
  try {
    const product = await prisma.product.create({
      data: {
        Title,
        Price,
        Images,
        Description,
        Reviews,
        Categories,
        mainImg,
        Colors,
        Properties,
      },
    });
    return { product };
  } catch (error) {
    return { error };
  }
}

export async function getProductById(ids: Array<string>) {
  try {
    const product = await prisma.product.findMany({
      where: { id: { in: ids } },
    });
    return { product };
  } catch (error) {
    return { error };
  }
}

export async function updateProduct(
  id: string,
  Title: string,
  Price: number,
  Images: Array<object>,
  mainImg: string,
  Description: string,
  Reviews: Array<object>,
  Categories: Array<string>,
  Colors: Array<string>,
  Properties: object
) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        Title,
        Price,
        Images,
        mainImg,
        Description,
        Reviews,
        Categories,
        Colors,
        Properties,
      },
    });
    return { product };
  } catch (error) {
    return { error };
  }
}
export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.delete({
      where: { id },
    });
    return { product };
  } catch (error) {
    return { error };
  }
}
