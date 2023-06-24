"use client";
import Link from "next/link";
import { Product } from "@prisma/client";
import Image from "next/image";
import {
  removeFromCartAction,
  saveToLaterAction,
  updateQuantityAction,
} from "../_actions";
function CartProductCard({
  userId,
  product,
  quantity,
}: {
  userId: string;
  product: Product;
  quantity?: number;
}) {
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
          <p className="max-h-[75px] overflow-hidden">{product.Title}</p>
          <span>
            $<span className="text-xl font-bold">{product.Price}</span>
          </span>
          <div className="flex">
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
              className="mx-1 rounded-md w-12 text-center"
            />
            <button
              onClick={() => removeFromCartAction(userId, product.id)}
              className="mx-5"
            >
              Delete
            </button>
            <button onClick={() => saveToLaterAction(userId, product.id)}>
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
