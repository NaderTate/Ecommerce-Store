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

export async function createUserAfterAuth(
  UserId: string,
  Name: string,
  Email: string,
  Image: string
) {
  try {
    // Check if user exists, usually this function only runs when a new user signs up, but just to be safe.
    const user = await prisma.user.findUnique({
      where: { UserId },
    });
    if (!user) {
      await prisma.user.create({
        data: {
          UserId,
          Name,
          Email,
          Gender: "",
          Phone: "",
          BirthDate: "",
          Image,
        },
      });
      return { success: true };
    }
  } catch (error) {
    return { sucess: false, error };
  }
}
export async function placeOrder(
  UserId: string,
  Products: Array<{ id: string; quantity: number }>,
  OrderTotal: number,
  PaymentMethod: string,
  IsComplete: boolean,
  OrderSummary: {
    Items: number;
    Shipping: number;
    CODFee: number;
    Total: number;
    Coupon: number;
    OrderTotal: number;
  }
) {
  try {
    const IDs: Array<{ id: string }> = [];
    Products.map(({ id }) => {
      IDs.push({ id });
    });
    const Order = await prisma.order.create({
      data: {
        User: { connect: { UserId } },
        PaymentMethod,
        OrderTotal,
        PlacedOn: new Date().toString(),
        CompletedOn: "",
        Orders: Products,
        IsComplete,
        Address: { connect: { UserId } },
        OrderSummary,
        Product: { connect: IDs },
      },
    });

    return { Order };
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
    message += "Order total: " + "*" + OrderTotal + "*" + " 🤑 %0a %0a";
    ProductsDetails?.map(({ Title, quantity }) => {
      message += Title + "%0a" + "Quanitity: " + quantity + "%0a %0a";
    });
    message +=
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
