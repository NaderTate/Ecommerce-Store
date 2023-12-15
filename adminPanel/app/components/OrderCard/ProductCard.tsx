"use client";
import Link from "next/link";
import Image from "next/image";
import { Image as Next_UI_Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";
type Props = {
  product: {
    id: string;
    mainImg: string;
    Title: string;
    Price: number;
  };
  quantity?: number;
  userId?: string;
};
function ProductCard({ product, quantity }: Props) {
  return (
    <>
      <Link href={{ pathname: `/products/${product.id}` }}>
        <div
          className={`p-5 bg-default/40 dark:bg-content1/40 rounded-md relative`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Next_UI_Image
              as={Image}
              width={500}
              height={500}
              src={product.mainImg}
              className="object-contain aspect-square w-full rounded-md "
              alt={product.Title}
            />
          </motion.div>
          {quantity && (
            <circle className="absolute -top-2 -right-2 bg-black/50 text-xs text-white aspect-square p-1 rounded-full">
              {quantity}
            </circle>
          )}
        </div>
      </Link>
      <p className={`line-clamp-1 text-center`}>{product.Title}</p>
      <div className="text-xs text-center">${product.Price}</div>
    </>
  );
}

export default ProductCard;
