import React from "react";
import { getProducts } from "@/lib/products";
import ProductCard from "./ProductCard";
async function NewArrivals() {
  const { products } = await getProducts(1, 11);
  console.log(products);

  return (
    <div className="w-screen flex justify-center">
      <div className="flex flex-wrap gap-10  justify-between ">
        {products?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}

export default NewArrivals;
