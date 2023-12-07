"use server";
import prisma from "@/lib/prisma";
import { deleteProduct, getProductById } from "@/lib/products";
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

export const createProduct = async (
  Title: string,
  Price: number,
  Images: Array<object>,
  mainImg: string,
  secondImage: string,
  Description: string,
  Categories: Array<string>,
  Colors: Array<string>,
  Properties: object
) => {
  await prisma.product.create({
    data: {
      Title,
      Price,
      Images,
      Description,
      Rating: 5,
      Categories: { connect: Categories.map((category) => ({ id: category })) },
      mainImg,
      secondImage,
      Colors,
      Properties,
    },
  });
  revalidatePath("/products");
};

export const updateProduct = async (
  id: string,
  Title: string,
  Price: number,
  Images: Array<object>,
  mainImg: string,
  secondImage: string,
  Description: string,
  Categories: Array<string>,
  Colors: Array<string>,
  Properties: object
) => {
  await prisma.product.update({
    where: { id },
    data: {
      Title,
      Price,
      Images,
      secondImage,
      Description,
      Rating: 5,
      Categories: { connect: Categories.map((category) => ({ id: category })) },
      mainImg,
      Colors,
      Properties,
    },
  });
  revalidatePath("/products");
};
// export async function createProductAction(
//   Title: string,
//   Price: number,
//   Images: Array<object>,
//   mainImg: string,
//   Description: string,
//   Categories: Array<string>,
//   Colors: Array<string>,
//   Properties: object
// ) {
//   await createProduct(
//     Title,
//     Price,
//     Images,
//     mainImg,
//     Description,
//     Categories,
//     Colors,
//     Properties
//   );
//   revalidatePath("/");
// }
// export async function updateProductAction(
//   id: string,
//   Title: string,
//   Price: number,
//   Images: Array<object>,
//   mainImg: string,
//   Description: string,
//   Categories: Array<string>,
//   Colors: Array<string>,
//   Properties: object
// ) {
//   await updateProduct(
//     id,
//     Title,
//     Price,
//     Images,
//     mainImg,
//     Description,
//     Categories,
//     Colors,
//     Properties
//   );
//   revalidatePath("/");
// }
// export async function deleteProductAction(id: string) {
//   await deleteProduct(id);
//   revalidatePath("/products");
// }
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
