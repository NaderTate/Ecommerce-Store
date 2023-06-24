import Link from "next/link";
import { Product } from "@prisma/client";
import Image from "next/image";
function ProductCard({
  product,
  width,
  height,
  quantity,
}: {
  product: Product;
  width: string;
  height: string;
  quantity?: number;
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
          {quantity && (
            <span className="absolute top-0 right-0 bg-black/50 rounded-bl-md text-white p-[2px]">
              {quantity}
            </span>
          )}
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
