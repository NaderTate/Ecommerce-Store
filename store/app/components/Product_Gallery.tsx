"use client";
import { useState } from "react";
import Image from "next/image";
import { Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
export default function Product_Gallery({ gallery }: { gallery: any }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div>
        <Swiper
          // @ts-ignore
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs]}
          className="thumbs"
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-gallery-${item.id}`}
              className="flex justify-center items-center"
            >
              <Image
                src={item.img}
                alt={`Product gallery ${item.id}`}
                width={450}
                height={450}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Swiper
        spaceBetween={10}
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        navigation
        className="mySwiper2 flex items-center"
      >
        {gallery?.map((item: any) => (
          <SwiperSlide
            key={`product-gallery-${item.id}`}
            className="flex justify-center items-center h-full"
          >
            <Image
              src={item.img}
              alt={`Product gallery ${item.id}`}
              width={450}
              height={450}
              className="object-cover h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
