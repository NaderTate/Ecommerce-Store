"use client";
import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { addToCartAction } from "../_actions";
function CartPageRecommendedProductCard({
  product,
  userId,
}: {
  product: Product;
  userId: string;
}) {
  return (
    <div>
      <div className="flex  gap-2">
        <Link href={{ pathname: `/products/${product.id}` }}>
          <div className="relative w-24 h-24  md:w-20 md:h-20">
            <Image
              sizes="25vw"
              fill
              className="object-cover"
              src={product.mainImg}
              alt={product.Title}
            />
          </div>
        </Link>
        <div className="flex flex-col gap-1">
          <p className="max-h-[35px] overflow-hidden text-sm">
            {product.Title}
          </p>
          <span className="text-xs">${product.Price}</span>
          <span
            onClick={() => addToCartAction(userId || "", { id: product.id })}
            className="text-xs bg-blue-700 rounded-md w-[70px] text-center tracking-tighter cursor-pointer text-white"
          >
            Add to cart
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartPageRecommendedProductCard;
