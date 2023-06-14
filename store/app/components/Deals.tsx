import React from "react";
import { getProducts } from "@/lib/products";

import ProductCard from "./ProductCard";

async function Deals() {
  const { products } = await getProducts(1, 4);
  return (
    <div className="mx-10">
      <h1>Shop deals in Fashion</h1>
      <div className="grid grid-cols-2 gap-5 ">
        {products?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}

export default Deals;
