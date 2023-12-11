"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import SwiperNavButtons from "./SwiperNavButtons";
function ProductsCarousel({
  data,
  addToCartButton = false,
  userId,
}: {
  data: {
    id: string;
    mainImg: string;
    secondImage: string;
    Title: string;
    Price: number;
  }[];
  addToCartButton?: boolean;
  userId?: string;
}) {
  return (
    <div>
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
          className="HomeSlider"
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
    </div>
  );
}

export default ProductsCarousel;
