"use client";
import Link from "next/link";
import { Product } from "@prisma/client";
import Image from "next/image";
import { addToCartAction } from "../_actions";

function ProductCard({
  product,
  width,
  height,
  quantity,
  cartPage = false,
  userId,
}: {
  product: Product;
  width: string;
  height: string;
  quantity?: number;
  cartPage?: boolean;
  userId?: string;
}) {
  return (
    <div className={`${width}`}>
      <Link href={{ pathname: `/products/${product.id}` }}>
        <div className={`relative ${width} ${height} bg-white rounded-md`}>
          <Image
            sizes="30vw"
            fill
            src={product.mainImg}
            className="object-contain rounded-md"
            alt={product.Title}
          />
          {quantity && (
            <span className="absolute top-0 right-0 bg-black/50 rounded-bl-md text-white p-[2px]">
              {quantity}
            </span>
          )}
        </div>
      </Link>
      <p className={`line-clamp-1 text-xs`}>{product.Title}</p>
      <div className="text-xs">${product.Price}</div>
      {cartPage && (
        <button
          onClick={() => addToCartAction(userId || "", { id: product.id })}
          className="text-xs bg-blue-700 rounded-md px-2 text-center tracking-tighter cursor-pointer text-white"
        >
          Add to cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
