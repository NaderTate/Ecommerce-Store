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
        mainImg,
        Colors,
        Properties,
        Rating: 5,
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
export async function addToCart(UserId: string, Item: { id: string }) {
  try {
    const user = await prisma.user.findFirst({ where: { UserId } });
    const item = user?.Cart.filter((obj: any) => {
      return obj?.id === Item.id;
    });
    if (item) {
      if (item.length > 0) {
        const cartItems: any = user?.Cart;
        const itemIndex: number = cartItems?.findIndex(
          (obj: any) => obj.id == Item.id
        );
        cartItems[itemIndex].quantity = cartItems[itemIndex].quantity + 1;
        await prisma.user.update({
          where: { UserId },
          data: {
            Cart: { set: cartItems },
          },
        });
      } else {
        await prisma.user.update({
          where: { UserId },
          data: {
            Cart: { push: { id: Item.id, quantity: 1 } },
          },
        });
      }
    }
  } catch (error) {
    return { error };
  }
}
export async function addToFavorites(UserId: string, Item: any) {
  try {
    const user = await prisma.user.findFirst({
      where: { UserId },
      select: { WhishList: true },
    });
    const WhishList = user?.WhishList;
    if (WhishList?.find((ID: any) => ID.id == Item.id)) {
      const updatedWhishlist = WhishList?.filter((ID: any) => ID.id != Item.id);
      await prisma.user.update({
        where: { UserId },
        data: {
          WhishList: {
            set: updatedWhishlist,
          },
        },
      });
    } else {
      await prisma.user.update({
        where: { UserId },
        data: {
          WhishList: { push: Item },
        },
      });
      return { success: true };
    }
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
export async function updateQuantity(
  UserId: string,
  id: string,
  quantity: number
) {
  try {
    const user = await prisma.user.findFirst({
      where: { UserId },
      select: { Cart: true },
    });
    const Cart: any = user?.Cart;
    const itemIndex: number = Cart?.findIndex((obj: any) => obj.id == id);
    Cart[itemIndex].quantity = quantity;
    await prisma.user.update({
      where: { UserId },
      data: {
        Cart: { set: Cart },
      },
    });
  } catch (error) {
    return { error };
  }
}
export async function saveToLater(UserId: string, id: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { UserId },
      select: { Cart: true, WhishList: true },
    });
    const currentCart = user?.Cart;
    const updatedCart = currentCart?.filter((ID: any) => ID.id != id);
    const WhishList = user?.WhishList;
    if (!WhishList?.find((ID: any) => ID.id == id)) {
      await prisma.user.update({
        where: { UserId },
        data: {
          WhishList: { push: { id } },
        },
      });
    }
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
