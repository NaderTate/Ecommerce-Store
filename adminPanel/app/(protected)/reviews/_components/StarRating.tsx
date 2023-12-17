import { FaStar } from "react-icons/fa";
type Props = {
  rating: number;
  hideNumber?: boolean;
};
function StarRating({ rating, hideNumber }: Props) {
  const percentage = (rating * 100) / 5;

  return (
    <div className="flex gap-2 items-center">
      {!hideNumber && rating}

      <div className="relative h-6 w-[120px]">
        <div className="absolute top-0 right-0 left-0 bottom-0 flex">
          <FaStar className="w-6" />
          <FaStar className="w-6" />
          <FaStar className="w-6" />
          <FaStar className="w-6" />
          <FaStar className="w-6" />
        </div>
        <div
          style={{ width: `${percentage}%` }}
          className={`relative h-6 top-0 right-0 left-0 bottom-0 flex overflow-hidden`}
        >
          <FaStar className="fill-yellow-500 absolute w-6 top-0 left-0" />
          <FaStar className="fill-yellow-500 absolute w-6 top-0 left-6" />
          <FaStar className="fill-yellow-500 absolute w-6 top-0 left-12" />
          <FaStar className="fill-yellow-500 absolute w-6 top-0 left-[72px]" />
          <FaStar className="fill-yellow-500 absolute w-6 top-0 left-24" />
        </div>
      </div>
    </div>
  );
}

export default StarRating;
