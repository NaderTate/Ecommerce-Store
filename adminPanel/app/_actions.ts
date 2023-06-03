"use server";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "@/lib/products";
import { revalidatePath } from "next/cache";

export async function getProductByIdAction(id: string) {
  await getProductById(id);
  revalidatePath("/products");
}
export async function createProductAction(
  Title: string,
  price: number,
  Images: Array<object>,
  Description: string,
  Reviews: Array<object>,
  Categories: Array<string>,
  Colors: Array<string>
) {
  await createProduct(
    Title,
    price,
    Images,
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
