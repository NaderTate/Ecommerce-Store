import { Prisma } from "@prisma/client";
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
        Gender: "",
        Phone: 0,
        BirthDate: "",
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

export async function updateAddress(UserId: string, Address: object) {
  try {
    var json = [{ ...Address }] as Prisma.JsonArray;
    const user = await prisma.user.update({
      where: { UserId },
      data: {
        Address: json,
      },
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
  Phone: number,
  Gender: string,
  BirthDate: string,
  Image: string
) {
  try {
    const user = await prisma.user.update({
      where: { UserId },
      data: {
        Name,
        Email,
        Gender,
        Phone,
        BirthDate,
        Image,
      },
    });
    return { user };
  } catch (error) {
    return { error };
  }
}
export async function createUserAfterAuth(
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
          Gender: "",
          Phone: 0,
          BirthDate: "",
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
