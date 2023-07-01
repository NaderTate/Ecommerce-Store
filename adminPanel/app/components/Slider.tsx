"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import ProductCard from "./ProductCard";
import { Product } from "@prisma/client";
import Link from "next/link";

import Image from "next/image";

const Card = ({
  product,
  width,
  height,
  quantity,
}: {
  product: Product;
  width: string;
  height: string;
  quantity?: number;
  cartPage?: boolean;
  userId?: string;
}) => {
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
};
function Slider({
  data,
  title,
}: {
  data: any;
  title: string;
  cartPage?: boolean;
  userId?: string;
}) {
  return (
    <div>
      <div className="bg-white dark:bg-black/30  p-3 rounded-md lg:mr-5 my-5">
        <h1>{title}</h1>
        <Swiper slidesPerView="auto" spaceBetween={10} className="HomeSlider">
          {data &&
            data.map((product: any) => {
              return (
                <SwiperSlide key={product.id}>
                  <Card width="w-56" height="h-56" product={product} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;
