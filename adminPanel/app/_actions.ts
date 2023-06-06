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
import { revalidatePath } from "next/cache";
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
  Colors: Array<string>
) {
  await createProduct(
    Title,
    price,
    Images,
    mainImg,
    Description,
    Reviews,
    Categories,
    Colors
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
  Colors: Array<string>
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
    Colors
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
