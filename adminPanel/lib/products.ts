import prisma from "./prisma";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany();
    return { products };
  } catch (error) {
    return { error };
  }
}

export async function createProduct(
  Title: string,
  Price: number,
  Images: Array<object>,
  Description: string,
  Reviews: Array<object>,
  Categories: Array<string>,
  Colors: Array<string>
) {
  try {
    const product = await prisma.product.create({
      data: { Title, Price, Images, Description, Reviews, Categories, Colors },
    });
    return { product };
  } catch (error) {
    return { error };
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({ where: { id } });
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
  Description: string,
  Reviews: Array<object>,
  Categories: Array<string>,
  Colors: Array<string>
) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: { Title, Price, Images, Description, Reviews, Categories, Colors },
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
