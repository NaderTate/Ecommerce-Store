import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { v4 as uuidv4 } from "uuid";
import { getProductById } from "./products";
import axios from "axios";

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
export async function placeOrder(
  UserId: string,
  Products: Array<{ id: string; quantity: number }>,
  OrderTotal: number,
  PaymentMethod: string,
  Address: object,
  IsCompleted: boolean
) {
  try {
    const user = await prisma.user.update({
      where: { UserId },
      data: {
        Orders: {
          push: {
            OrderId: uuidv4(),
            Products,
            OrderTotal,
            PaymentMethod,
            Address,
            IsCompleted,
          },
        },
      },
    });

    return { user };
  } catch (error) {
    return { error };
  }
}
export async function SendToWhatsApp(
  OrderTotal: number,
  Products: Array<{ id: string; quantity: number }>
) {
  try {
    const ProductsDetails: Array<{ Title: string; quantity: number }> = [];
    const ProductIDs: Array<string> = [];
    Products.map(({ id }) => ProductIDs.push(id));
    const ProductDetails = await prisma.product.findMany({
      where: { id: { in: ProductIDs } },
      select: { id: true, Title: true },
    });
    Products.map(({ id, quantity }) => {
      ProductsDetails.push({
        Title: ProductDetails.find((product) => product.id == id)?.Title || "",
        quantity,
      });
    });
    let message = "🚨 *New Order* 🚨 %0a %0a";
    message += "🤑🤑 " + "$" + "*" + OrderTotal + "*" + " 🤑🤑 %0a %0a";
    ProductsDetails?.map(({ Title, quantity }) => {
      message = message + Title + "%0a" + "Quanitity: " + quantity + "%0a %0a";
    });
    message =
      message +
      "See the full details at: %0a https://expressadmin.vercel.app/orders";
    await axios.get(
      `https://api.callmebot.com/whatsapp.php?phone=+201008564637&text=${message}&apikey=7206005`
    );
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
