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
import {
  createAdmin,
  updateadmin,
  deleteAdmin,
  deleteUser,
} from "@/lib/admins";
import { revalidatePath } from "next/cache";
import { markAsComplete } from "@/lib/orders";
// ******************* Products Actions *********************************

export async function getProductByIdAction(id: string) {
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
// *************************** Admin ********************************************
export async function createAdminAction(
  name: string,
  email: string,
  image: string
) {
  await createAdmin(name, email, image);
  revalidatePath("/admins");
}
export async function updateAdminAction(
  id: string,
  name: string,
  email: string,
  image: string
) {
  await updateadmin(id, name, email, image);
  revalidatePath("/admins");
}
export async function deleteAdminAction(id: string) {
  await deleteAdmin(id);
  revalidatePath("/admins");
}
export async function deleteUserAction(id: string) {
  await deleteUser(id);
  revalidatePath("/users");
}
// **************************** Orders **********************************
export async function markAsCompleteAction(id: string) {
  await markAsComplete(id);
  revalidatePath("/orders");
}
