import React from "react";
import ProductCard from "./ProductCard";
import { prisma } from "@/lib/prisma";
async function Deals({ title, id }: { title: string; id: string }) {
  const products = await prisma.product.findMany({
    where: { CategoryIDs: { has: id } },
    take: 4,
  });
  // The following code is fetches random products from the database
  //   const count = await prisma.product.count({
  //   where: { CategoryIDs: { has: id } },
  // });
  // const skip = Math.floor(Math.random() * count);
  // const products = await prisma.product.findMany({
  //   where: { CategoryIDs: { has: id } },
  //   take: 4,
  //   skip,
  // });

  return (
    <div className=" bg-white dark:bg-black/30 rounded-md p-3">
      <h1 className="text-center mb-2 line-clamp-1">{title}</h1>
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
