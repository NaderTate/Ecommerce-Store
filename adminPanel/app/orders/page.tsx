import React from "react";
import NavLayout from "../components/NavLayout";
import { getProducts } from "@/lib/products";
async function page() {
  // const { products } = await getProducts();
  return (
    <div>
      <NavLayout>orders</NavLayout>
    </div>
  );
}

export default page;
