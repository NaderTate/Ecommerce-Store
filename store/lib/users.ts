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

export async function updateAddress(
  UserId: string,
  Address: {
    Country: string;
    City: string;
    Street: string;
    Building: string;
    PostalCode: number;
    Landmark: string;
  }
) {
  try {
    const user = await prisma.address.upsert({
      where: { UserId },
      update: { ...Address },
      create: { ...Address, UserId },
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
          WhishList: [],
          Address: {
            create: {
              Country: "",
              City: "",
              Street: "",
              Building: "",
              PostalCode: 0,
              Landmark: "",
            },
          },
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
    const user = await prisma.user.update({
      where: { UserId },
      data: {
        Orders: {
          create: {
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
        },
      },
    });

    return { user };
    // const data = await prisma.order.findUnique({
    //   where: { id: "649dec2821b0bbae453f3473" },
    //   include: { Product: { select: { Title: true } } },
    //   // include: { User: { select: { Name: true, Email: true } } },
    // });
    // console.log(data);
    // const data = await prisma.user.findUnique({
    //   where: { id: "649d571e9acc6b265d6c10ce" },
    //   include: {
    //     Orders: { include: { Product: { select: { Title: true } } } },
    //   },
    // });
    // console.log(data?.Orders[0].Product);
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
    message += "🤑 " + "$" + "*" + OrderTotal + "*" + " 🤑 %0a %0a";
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
