import { prisma } from "./prisma";

export async function getUsers(sk: number, take: number) {
  try {
    const count = await prisma.user.count();
    const users = await prisma.user.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
      take,
      skip: (sk - 1) * take,
    });
    return { users, count };
  } catch (error) {
    return { error };
  }
}

export async function createUser(
  UserId: string,
  Name: string,
  Email: string,
  Image: string,
  Cart: Array<object>,
  Orders: Array<object>,
  WhishList: Array<object>,
  Address: object
) {
  try {
    const user = await prisma.user.create({
      data: {
        UserId,
        Name,
        Email,
        Image,
        Cart,
        Orders,
        WhishList,
        Address,
      },
    });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function getUserById(UserId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { UserId: UserId },
    });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function updateUserInfo(
  UserId: string,
  Name: string,
  Email: string,
  Image: string
) {
  try {
    if (!(await getUserById(UserId)).user) {
      const user = await prisma.user.create({
        data: {
          UserId,
          Name,
          Email,
          Image,
          Cart: [],
          Orders: [],
          WhishList: [],
          Address: {},
        },
      });
      return { user };
    }
  } catch (error) {
    return { error };
  }
}
export async function addToCart(UserId: string, Item: object) {
  try {
    const user = await prisma.user.update({
      where: { UserId },
      data: {
        Cart: { push: Item },
      },
    });
    return { user };
  } catch (error) {
    return { error };
  }
}
export async function deleteUser(UserId: string) {
  try {
    const user = await prisma.user.delete({
      where: { UserId },
    });
    return { user };
  } catch (error) {
    return { error };
  }
}
