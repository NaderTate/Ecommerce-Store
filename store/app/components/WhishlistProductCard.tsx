"use client";
import Link from "next/link";
import { Product } from "@prisma/client";
import Image from "next/image";
import { addToCartAction, removeFromWhishlistAction } from "../_actions";
function WhishlistProductCard({
  userId,
  product,
}: {
  userId: string;
  product: Product;
}) {
  return (
    <div>
      <div className="flex  gap-2">
        <Link href={{ pathname: `/products/${product.id}` }}>
          <div className="relative w-24 h-24  md:w-48 md:h-48 bg-white">
            <Image
              sizes="30vw"
              fill
              className="object-contain rounded-md"
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
            <button
              onClick={() => {
                addToCartAction(userId, { id: product.id });
              }}
              className="bg-blue-700 px-3 py-1 rounded-md text-white"
            >
              Add to cart
            </button>
            <button
              onClick={() => removeFromWhishlistAction(userId, product.id)}
              className="sm:mx-5 mr-5"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* for mobile view*/}
      <div className="flex my-2 gap-5 md:hidden">
        <button
          onClick={() => {
            addToCartAction(userId, { id: product.id });
          }}
          className="bg-blue-700 px-3 py-1 rounded-md text-white"
        >
          Add to cart
        </button>
        <button
          onClick={() => removeFromWhishlistAction(userId, product.id)}
          className="rounded-md bg-black/10  dark:bg-gray-800 px-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default WhishlistProductCard;
