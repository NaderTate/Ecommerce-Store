"use server";
import { prisma } from "@/lib/prisma";
import { currencySymbol } from "../global_variables";

export const placeOrder = async (
  userId: string,
  PaymentMethod: string,
  itemsIDs: { id: string }[],
  OrderSummary: {
    Items: number;
    Shipping: number;
    CODFee: number;
    Total: number;
    Coupon: number;
    OrderTotal: number;
  }
) => {
  try {
    const OrderCreation = prisma.order.create({
      data: {
        User: { connect: { UserId: userId } },
        PaymentMethod,
        OrderTotal: OrderSummary.OrderTotal,
        CompletedOn: "",
        Products: { connect: itemsIDs },
        IsComplete: false,
        Address: { connect: { UserId: userId } },
        OrderSummary,
      },
    });
    // remove the items from the user cart after the order has been placed
    const CartDisconnection = prisma.user.update({
      where: { UserId: userId },
      data: { Cart: { disconnect: itemsIDs } },
    });

    const result = await prisma.$transaction([
      OrderCreation,
      CartDisconnection,
    ]);
    return { success: true };
  } catch (error) {
    return { error };
  }
};
export async function SendToWhatsApp(
  OrderTotal: number,
  Products: {
    Product: {
      Title: string;
      Price: number;
    };
    Quantity: number;
  }[]
) {
  try {
    let message = "🚨 *New Order* 🚨 %0a %0a";
    message +=
      "Order total: " + currencySymbol + "*" + OrderTotal + "*" + " 🤑 %0a %0a";
    Products?.map(({ Product, Quantity }) => {
      message += Product.Title + "%0a" + "Quanitity: " + Quantity + "%0a %0a";
    });
    message +=
      "See the full details at: %0a https://expressadmin.vercel.app/orders";
    await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=+201008564637&text=${message}&apikey=7206005`
    );
  } catch (error) {
    return { error };
  }
}
