"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Image as Next_UI_Image, Spacer } from "@nextui-org/react";

import { addToCart } from "@/actions/cart";
import { removeFromWishlist } from "@/actions/wishlist";

type Props = {
  product: {
    id: string;
    mainImg: string;
    secondImage: string;
    Title: string;
    Price: number;
  };
  quantity?: number;
  addToCartButton?: boolean;
  removeFromWishlistButton?: boolean;
  userId?: string;
};

function ProductCard({
  product,
  quantity,
  addToCartButton = false,
  removeFromWishlistButton = false,
  userId,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Next_UI_Image
              as={Image}
              width={500}
              height={500}
              src={isHovered ? product.secondImage : product.mainImg}
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
      {addToCartButton && (
        <Button
          color="primary"
          size="sm"
          fullWidth
          isLoading={loading}
          isDisabled={loading}
          onPress={async () => {
            setLoading(true);
            await addToCart(product.id, userId as string);
            setLoading(false);
          }}
        >
          Add to cart
        </Button>
      )}
      <Spacer y={1} />
      {removeFromWishlistButton && (
        <Button
          color="danger"
          size="sm"
          fullWidth
          onPress={() => {
            removeFromWishlist(product.id);
          }}
        >
          Remove
        </Button>
      )}
    </>
  );
}

export default ProductCard;
