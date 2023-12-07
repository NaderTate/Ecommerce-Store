import { useSwiper } from "swiper/react";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
type Props = {};

const SwiperNavButtons = (props: Props) => {
  const swiper = useSwiper();
  return (
    <div>
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
    </div>
  );
};

export default SwiperNavButtons;
