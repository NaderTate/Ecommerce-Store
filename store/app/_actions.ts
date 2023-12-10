"use server";
import {
  updateProduct,
  getProductById,
  removeFromCart,
  removeFromWhishlist,
  addReview,
} from "@/lib/products";

import { SendToWhatsApp, deleteUser, placeOrder } from "@/lib/users";
import { revalidatePath } from "next/cache";
// ******************* Products Actions *********************************

export async function getProductByIdAction(id: Array<string>) {
  await getProductById(id);
  revalidatePath("/products");
}

export async function updateProductAction(
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
  await updateProduct(
    id,
    Title,
    Price,
    Images,
    mainImg,
    Description,
    Reviews,
    Categories,
    Colors,
    Properties
  );
  revalidatePath("/products");
}

export async function removeFromCartAction(UserId: string, id: string) {
  await removeFromCart(UserId, id);
  revalidatePath("/cart");
}
export async function removeFromWhishlistAction(UserId: string, id: string) {
  await removeFromWhishlist(UserId, id);
  revalidatePath("/whishlist");
}

export async function addReviewAction(
  UserId: string,
  ProductId: string,
  Rating: number,
  Comment: string
) {
  await addReview(UserId, ProductId, Rating, Comment);
  revalidatePath("/");
}

// **************************Users Action*********************************************

export async function placeOrderAction(
  UserId: string,
  Products: Array<{ id: string; quantity: number }>,
  OrderTotal: number,
  PaymentMethod: string,
  // Address: object,
  IsCompleted: boolean,
  OrderSummary: {
    Items: number;
    Shipping: number;
    CODFee: number;
    Total: number;
    Coupon: number;
    OrderTotal: number;
  }
) {
  const order = await placeOrder(
    UserId,
    Products,
    OrderTotal,
    PaymentMethod,
    // Address,
    IsCompleted,
    OrderSummary
  );
  revalidatePath("/");
  return order;
}
export async function SendToWhatsAppAction(
  OrderTotal: number,
  Products: Array<{ id: string; quantity: number }>
) {
  await SendToWhatsApp(OrderTotal, Products);
  revalidatePath("/");
}
export async function deleteUserAction(id: string) {
  await deleteUser(id);
  revalidatePath("/");
}
