"use client";

import Image from "next/image";
import { useState } from "react";

import { Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";

type Props = {
  gallery: { img: string; id: string }[];
};

export default function Product_Gallery({ gallery }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="md:sticky md:float-left md:top-20 md:w-[40vw] md:mr-10">
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
            {gallery?.map((item) => (
              <SwiperSlide
                key={`product-gallery-${item.id}`}
                className="flex justify-center items-center"
              >
                <Image
                  src={item.img}
                  alt={`Product gallery ${item.id}`}
                  width={450}
                  height={450}
                  className="rounded-md"
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
          {gallery?.map((item) => (
            <SwiperSlide
              key={`product-gallery-${item.id}`}
              className="flex justify-center items-center h-full"
            >
              <Image
                src={item.img}
                alt={`Product gallery ${item.id}`}
                width={450}
                height={450}
                className="object-contain h-full rounded-md max-h-[80vh]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
