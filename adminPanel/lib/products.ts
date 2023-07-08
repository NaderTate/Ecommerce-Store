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
  Categories: Array<string>,
  Colors: Array<string>,
  Properties: object
) {
  try {
    const Categories_: Array<{}> = [];
    Categories.map((category) => Categories_.push({ id: category }));
    const product = await prisma.product.create({
      data: {
        Title,
        Price,
        Images,
        Description,
        Rating: 5,
        Categories: { connect: Categories_ },
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
  mainImg: string,
  Description: string,
  Categories: Array<string>,
  Colors: Array<string>,
  Properties: object
) {
  try {
    const Categories_: Array<{ id: string }> = [];
    Categories.map((category) => Categories_.push({ id: category }));
    await prisma.product.update({
      where: { id },
      data: {
        Categories: { set: [] },
      },
    });
    const product = await prisma.product.update({
      where: { id },
      data: {
        Title,
        Price,
        Images,
        mainImg,
        Description,
        Rating: 5,
        Categories: { connect: Categories_ },
        Colors,
        Properties,
      },
      include: { Categories: true },
    });
    console.log(product);
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
