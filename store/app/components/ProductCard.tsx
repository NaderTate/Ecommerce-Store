"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { Product } from "@prisma/client";
import { addToCartAction, updateUserInfoAction } from "../_actions";
import { useAuth } from "@clerk/nextjs";

import Image from "next/image";
function ProductCard({ product }: { product: Product }) {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  return (
    <div className="">
      <Link
        href={{ pathname: "/products/" + product.id }}
        className="group block"
      >
        <div className="w-[120px] h-[120px] relative">
          <Image
            fill
            src={product.mainImg}
            alt={product.Title}
            className="object-cover rounded-md"
          />
        </div>

        <div className="mt-3  max-w-[200px] overflow-hidden">
          <div>
            <h3 className=" group-hover:underline ">{product.Title}</h3>
          </div>

          <p className="">
            $ <span className="font-bold text-xlzz">{product.Price}</span>
          </p>
        </div>
      </Link>
      <button
        onClick={() => {
          // addProduct({
          //   id: product.id,
          //   img: product.mainImg,
          //   title: product.Title,
          // });
          if (userId) {
            addToCartAction(userId, { id: product.id });
          }
        }}
      >
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;
