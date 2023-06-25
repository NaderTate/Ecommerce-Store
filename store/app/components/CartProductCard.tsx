"use client";
import Link from "next/link";
import { Product } from "@prisma/client";
import Image from "next/image";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import {
  removeFromCartAction,
  saveToLaterAction,
  updateQuantityAction,
} from "../_actions";
import { useState } from "react";
function CartProductCard({
  userId,
  product,
  quantity,
}: {
  userId: string;
  product: Product;
  quantity?: number;
}) {
  const [quantity_, setQuantity] = useState(quantity || 1);
  return (
    <div>
      <div className="flex  gap-2">
        <Link href={{ pathname: `/products/${product.id}` }}>
          <div className="relative w-24 h-24  md:w-48 md:h-48">
            <Image
              fill
              className="object-cover"
              src={product.mainImg}
              alt={product.Title}
            />
          </div>
        </Link>
        <div className="flex flex-col gap-2">
          <p className="max-h-[35px] sm:max-h-[75px] overflow-hidden text-sm sm:text-md">
            {product.Title}
          </p>
          <span>
            $<span className="text-xl font-bold">{product.Price}</span>
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
                  updateQuantityAction(
                    userId,
                    product.id,
                    Number(e.target.value)
                  );
                }}
                className="mx-1 rounded-md w-12 text-center "
              />
            </div>
            <button
              onClick={() => removeFromCartAction(userId, product.id)}
              className="sm:mx-5 mr-5"
            >
              Delete
            </button>
            <button onClick={() => saveToLaterAction(userId, product.id)}>
              Save for later
            </button>
          </div>
        </div>
      </div>

      {/* for mobile view*/}
      <div className="flex justify-around my-2 md:hidden">
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
        <button className="rounded-md bg-black/10  dark:bg-gray-800 px-2">
          Delete
        </button>
        <button className="rounded-md bg-black/10  dark:bg-gray-800 px-2">
          Save to later
        </button>
      </div>
    </div>
  );
}

export default CartProductCard;
