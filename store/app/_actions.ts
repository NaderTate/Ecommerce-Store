"use server";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "@/lib/products";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/categories";
import { addToCart, createUser, deleteUser, updateUserInfo } from "@/lib/users";
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
export async function deleteProductAction(id: string) {
  await deleteProduct(id);
  revalidatePath("/products");
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
export async function createUserAction(
  UserId: string,
  Name: string,
  Email: string,
  Image: string,
  Cart: Array<object>,
  Orders: Array<object>,
  WhishList: Array<object>,
  Address: object
) {
  await createUser(
    UserId,
    Name,
    Email,
    Image,
    Cart,
    Orders,
    WhishList,
    Address
  );
  revalidatePath("/");
}
export async function updateUserInfoAction(
  UserId: string,
  Name: string,
  Email: string,
  Image: string
) {
  await updateUserInfo(UserId, Name, Email, Image);
  revalidatePath("/");
}
export async function addToCartAction(UserId: string, Item: object) {
  await addToCart(UserId, Item);
  revalidatePath("/");
}
export async function deleteUserAction(id: string) {
  await deleteUser(id);
  revalidatePath("/");
}
