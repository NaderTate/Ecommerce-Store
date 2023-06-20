"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import ProductCard from "./ProductCard";
function Slider({ data, title }: { data: any; title: string }) {
  return (
    <div>
      <div className="bg-white dark:bg-black/30  p-3 rounded-md lg:mr-10 md:ml-5 my-5">
        <h1>{title}</h1>
        <Swiper slidesPerView="auto" spaceBetween={10} className="HomeSlider">
          {data &&
            data.map((product: any) => {
              return (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} width="w-56" height="h-56" />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;
