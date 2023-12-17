"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import { ProductCardProps } from "@/typings";
function ProductsCarousel({
  data,
  userId,
}: {
  data: ProductCardProps[];
  addToCartButton?: boolean;
  userId?: string;
}) {
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
                <ProductCard userId={userId} product={product} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default ProductsCarousel;
