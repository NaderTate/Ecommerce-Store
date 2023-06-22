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
export async function addToFavorites(UserId: string, Item: any) {
  try {
    const WhishList: Array<string> = [];
    const filtered: Array<object> = [];
    const WhishList_: any = await prisma.user.findFirst({
      where: { UserId },
      select: { WhishList: true },
    });
    WhishList_.WhishList?.map(({ id }: { id: string }) => {
      WhishList.push(id);
    });
    if (WhishList.includes(Item.id)) {
      WhishList_.WhishList?.map(({ id }: { id: string }) => {
        if (id != Item.id) filtered.push({ id });
      });
      await prisma.user.update({
        where: { UserId },
        data: {
          WhishList: {
            set: filtered,
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
