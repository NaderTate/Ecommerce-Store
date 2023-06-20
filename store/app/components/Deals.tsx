import React from "react";
import { getProductByCategory } from "@/lib/products";
import ProductCard from "./ProductCard";
async function Deals({ title, category }: { title: string; category: string }) {
  const { products } = await getProductByCategory(category);
  return (
    <div className=" bg-white dark:bg-black/30 rounded-md p-3">
      <h1 className="text-center mb-2">{title}</h1>
      <div className="grid grid-cols-2 gap-5 justify-center ">
        {products?.map((product) => {
          return (
            <div className="m-auto" key={product.id}>
              <ProductCard product={product} width="w-36" height="h-36" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Deals;
