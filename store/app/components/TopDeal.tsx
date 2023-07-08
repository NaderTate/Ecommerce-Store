import Link from "next/link";
import React from "react";
import { Product } from "@prisma/client";
import Image from "next/image";
function TopDeal({ product }: { product: Product }) {
  return (
    <div className="min-h-full sm:hidden lg:flex flex flex-col mx-5 lg:mr-10 bg-white dark:bg-black/30 rounded-md">
      <div className="font-bold text-2xl text-center">Top Deal</div>
      <Link
        href={{ pathname: "/products/" + product.id }}
        className="grow relative h-full"
      >
        <div className="relative lg:static h-[600px] lg:h-full">
          <Image
            sizes="(max-width: 768px) 100vw,33vw"
            fill
            src={product.mainImg}
            alt={product.Title}
            className="object-cover"
          />
        </div>
      </Link>
      <div className="mt-3 ">
        <div>
          <h3 className=" group-hover:underline ">{product.Title}</h3>
        </div>

        <p className="">
          $ <span className="font-bold text-xl">{product.Price}</span>
        </p>
      </div>
    </div>
  );
}

export default TopDeal;
