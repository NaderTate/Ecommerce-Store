import Link from "next/link";
import React from "react";
import { Product } from "@prisma/client";
import Image from "next/image";
function ProductCard({
  product,
  width,
  height,
}: {
  product: Product;
  width: string;
  height: string;
}) {
  return (
    <div className={`${width}`}>
      <Link href={{ pathname: `/products/${product.id}` }}>
        <div className={`relative ${width} ${height}`}>
          <Image
            fill
            src={product.mainImg}
            className="object-cover rounded-md "
            alt={product.Title}
          />
        </div>
      </Link>
      <p
        className={`overflow-ellipsis whitespace-nowrap overflow-hidden text-xs`}
      >
        {product.Title}
      </p>
      <div className="text-xs">${product.Price}</div>
    </div>
  );
}

export default ProductCard;
