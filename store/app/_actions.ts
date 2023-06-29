"use server";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  removeFromCart,
  saveToLater,
  updateQuantity,
} from "@/lib/products";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/categories";
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
// ******************* Categories Actions *********************************

export async function createCategoryAction(
  label: string,
  Image: string,
  Properties: Array<object>,
  Parent: string
) {
  await createCategory(label, Image, Properties, Parent);
  revalidatePath("/categories");
}
export async function updataCategoryAction(
  id: string,
  label: string,
  Image: string,
  Properties: Array<object>,
  Parent: string
) {
  await updateCategory(id, label, Image, Properties, Parent);
  revalidatePath("/categories");
}
export async function deleteCategoryAction(id: string) {
  await deleteCategory(id);
  revalidatePath("/categories");
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
  await placeOrder(
    UserId,
    Products,
    OrderTotal,
    PaymentMethod,
    // Address,
    IsCompleted,
    OrderSummary
  );
  revalidatePath("/");
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
