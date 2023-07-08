"use server";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  removeFromCart,
  saveToLater,
  updateQuantity,
  removeFromWhishlist,
  addReview,
} from "@/lib/products";

import {
  SendToWhatsApp,
  deleteUser,
  placeOrder,
  updateAddress,
  updateUserInfo,
} from "@/lib/users";
import { addToCart, addToFavorites } from "@/lib/products";
import { revalidatePath } from "next/cache";
// ******************* Products Actions *********************************

export async function getProductByIdAction(id: Array<string>) {
  await getProductById(id);
  revalidatePath("/products");
}
export async function createProductAction(
  Title: string,
  price: number,
  Images: Array<object>,
  mainImg: string,
  Description: string,
  Reviews: Array<object>,
  Categories: Array<string>,
  Colors: Array<string>,
  Properties: object
) {
  await createProduct(
    Title,
    price,
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
export async function addToCartAction(UserId: string, Item: { id: string }) {
  await addToCart(UserId, Item);
  revalidatePath("/");
}
export async function addToFavoritesAction(UserId: string, Item: object) {
  await addToFavorites(UserId, Item);
  revalidatePath("/");
}
export async function removeFromCartAction(UserId: string, id: string) {
  await removeFromCart(UserId, id);
  revalidatePath("/cart");
}
export async function removeFromWhishlistAction(UserId: string, id: string) {
  await removeFromWhishlist(UserId, id);
  revalidatePath("/whishlist");
}
export async function saveToLaterAction(UserId: string, id: string) {
  await saveToLater(UserId, id);
  revalidatePath("/cart");
}
export async function updateQuantityAction(
  UserId: string,
  id: string,
  quantity: number
) {
  await updateQuantity(UserId, id, quantity);
  revalidatePath("/cart");
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

export async function updateUserInfoAction(
  UserId: string,
  Name: string,
  Email: string,
  Phone: number,
  Gender: string,
  BirthDate: string,
  Image: string
) {
  await updateUserInfo(UserId, Name, Email, Phone, Gender, BirthDate, Image);
  revalidatePath("/");
}

export async function updateAddressAction(
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
  await updateAddress(UserId, Address);
  revalidatePath("/");
}
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
