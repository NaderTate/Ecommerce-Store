import { FaRegStar } from "react-icons/fa";
type Props = {
  rating: number;
  reviewsCount?: number;
  hideNumber?: boolean;
  hideReviewsCount?: boolean;
};
function StarRating({
  rating,
  reviewsCount,
  hideNumber = false,
  hideReviewsCount = false,
}: Props) {
  const percentage = (rating * 100) / 5;
  return (
    <div className="flex gap-2 items-center">
      {!hideNumber && rating}

      <div className="relative h-5 w-[120px]">
        <div className="absolute top-0 right-0 left-0 bottom-0 flex">
          <FaRegStar className="w-6" />
          <FaRegStar className="w-6" />
          <FaRegStar className="w-6" />
          <FaRegStar className="w-6" />
          <FaRegStar className="w-6" />
        </div>
        <div
          style={{ width: `${percentage}%` }}
          className={`relative h-6 top-0 right-0 left-0 bottom-0 flex overflow-hidden`}
        >
          <FaRegStar className="fill-yellow-500 absolute w-6 top-0 left-0" />
          <FaRegStar className="fill-yellow-500 absolute w-6 top-0 left-6" />
          <FaRegStar className="fill-yellow-500 absolute w-6 top-0 left-12" />
          <FaRegStar className="fill-yellow-500 absolute w-6 top-0 left-[72px]" />
          <FaRegStar className="fill-yellow-500 absolute w-6 top-0 left-24" />
        </div>
      </div>
      {!hideReviewsCount && <span>{reviewsCount} Reviews</span>}
    </div>
  );
}

export default StarRating;
