"use client";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/css/navigation";

import ProductCard from "./ProductCard";
import SwiperNavButtons from "./SwiperNavButtons";

import { ProductCardProps } from "@/typings";

type ProductsCarouselProps = {
  data: ProductCardProps[];
  addToCartButton?: boolean;
  userId?: string;
};

function ProductsCarousel({
  data,
  addToCartButton = false,
  userId,
}: ProductsCarouselProps) {
  return (
    <div className="rounded-md my-5">
      <Swiper
        navigation
        modules={[Navigation]}
        breakpoints={{
          500: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={30}
      >
        {data &&
          data.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <ProductCard
                  userId={userId}
                  addToCartButton={addToCartButton}
                  product={product}
                />
              </SwiperSlide>
            );
          })}
        <SwiperNavButtons />
      </Swiper>
    </div>
  );
}

export default ProductsCarousel;
