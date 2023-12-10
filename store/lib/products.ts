import { prisma } from "./prisma";

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
export async function getProductByCategoryId(id: string, limit?: number) {
  try {
    const products = await prisma.product.findMany({
      where: { CategoryIDs: { has: id } },
      take: limit || 4,
    });
    return { products };
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
        Colors,
        Properties,
      },
    });
    return { product };
  } catch (error) {
    return { error };
  }
}

export async function removeFromCart(UserId: string, id: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { UserId },
      select: { Cart: true },
    });
    const currentCart = user?.Cart;
    const updatedCart = currentCart?.filter((ID: any) => ID.id != id);

    await prisma.user.update({
      where: { UserId },
      data: {
        Cart: { set: updatedCart },
      },
    });
  } catch (error) {
    return { error };
  }
}
export async function removeFromWhishlist(UserId: string, id: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { UserId },
      select: { WhishList: true },
    });
    const currentWhishlist = user?.WhishList;
    const updatedWhishlist = currentWhishlist?.filter((ID: any) => ID.id != id);

    await prisma.user.update({
      where: { UserId },
      data: {
        WhishList: { set: updatedWhishlist },
      },
    });
  } catch (error) {
    return { error };
  }
}

export async function addReview(
  UserId: string,
  ProductId: string,
  Rating: number,
  Comment: string
) {
  try {
    const ratings: Array<number> = [];
    ratings.push(Rating);
    const oldReviews = await prisma.review.findMany({
      where: { ProductId },
      select: { Rating: true },
    });
    oldReviews.map(({ Rating }) => ratings.push(Rating));
    const average = (array: Array<number>) =>
      array.reduce((a, b) => a + b) / array.length;
    const newRating = average(ratings);
    await prisma.product.update({
      where: { id: ProductId },
      data: {
        Rating: Math.round(newRating * 10) / 10,
        Reviews: {
          create: {
            Rating,
            Comment,
            User: { connect: { UserId } },
          },
        },
      },
    });
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
