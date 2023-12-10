"use client";
import Link from "next/link";
import Image from "next/image";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

import { useState } from "react";
import {
  removeFromCart,
  saveToLater,
  updateItemQuantity,
} from "../server_actions/cart";
import { currencySymbol } from "../global_variables";

type Props = {
  userId: string;
  product: {
    id: string;
    mainImg: string;
    secondImage: string;
    Title: string;
    Price: number;
  };
  quantity?: number;
  id: string;
};

function ProductCard({ userId, product, quantity, id }: Props) {
  const [quantity_, setQuantity] = useState(quantity || 1);
  return (
    <div>
      <div className="flex  gap-2">
        <Link href={{ pathname: `/products/${product.id}` }}>
          <Image
            width={100}
            height={100}
            className="object-contain rounded-md"
            src={product.mainImg}
            alt={product.Title}
          />
        </Link>
        <div className="flex flex-col gap-2">
          <p className="line-clamp-1">{product.Title}</p>
          <span>
            {currencySymbol}
            <span className="text-xl font-bold">{product.Price}</span>
          </span>
          <div className=" hidden md:flex">
            <div className="">
              <label htmlFor="quantity">Quantity:</label>
              <input
                min={1}
                id="quantity"
                type="number"
                defaultValue={quantity}
                onChange={(e) => {
                  updateItemQuantity(id, Number(e.target.value));
                }}
                className="mx-1 rounded-md w-12 text-center "
              />
            </div>
            <button onClick={() => removeFromCart(id)} className="sm:mx-5 mr-5">
              Delete
            </button>
            <button onClick={() => saveToLater(userId, product.id, id)}>
              Save for later
            </button>
          </div>
        </div>
      </div>

      {/* for mobile view*/}
      {/* <div className="flex justify-around my-2 md:hidden">
        <div className="flex">
          <MinusIcon
            onClick={() => {
              if (quantity_ > 1) {
                setQuantity(quantity_ - 1);
                updateQuantityAction(userId, product.id, Number(quantity_ - 1));
              }
            }}
            className="w-5"
          />
          <input
            type="number"
            min={1}
            className="mx-1 rounded-md w-12 text-center bg-black/10 dark:bg-gray-800 "
            defaultValue={quantity_}
            onChange={(e) => {
              updateQuantityAction(userId, product.id, Number(e.target.value));
            }}
          />
          <PlusIcon
            onClick={() => {
              setQuantity(quantity_ + 1);
              updateQuantityAction(userId, product.id, Number(quantity_ + 1));
            }}
            className="w-5"
          />
        </div>
        <button
          onClick={() => {
            removeFromCartAction(userId, product.id);
          }}
          className="rounded-md bg-black/10  dark:bg-gray-800 px-2"
        >
          Delete
        </button>
        <button
          onClick={() => {
            saveToLaterAction(userId, product.id);
          }}
          className="rounded-md bg-black/10  dark:bg-gray-800 px-2"
        >
          Save to later
        </button>
      </div> */}
    </div>
  );
}

export default ProductCard;
