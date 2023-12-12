// Custom navigation buttons for swiper instead of the default ones

import { useSwiper } from "swiper/react";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
type Props = {};

const SwiperNavButtons = ({}: Props) => {
  const swiper = useSwiper();
  return (
    <>
      <button onClick={() => swiper.slidePrev()}>
        <FaCircleChevronLeft
          size={20}
          className="opacity-75 hover:opacity-100 transition-opacity absolute top-[42%] left-3 z-20"
        />
      </button>
      <button onClick={() => swiper.slideNext()}>
        <FaCircleChevronRight
          size={20}
          className="opacity-75 hover:opacity-100 transition-opacity absolute top-[42%] right-3 z-20"
        />
      </button>
    </>
  );
};

export default SwiperNavButtons;
