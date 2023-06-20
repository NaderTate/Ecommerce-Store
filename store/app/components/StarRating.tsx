import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
function StarRating({ rating }: { rating: number }) {
  const percentage = (rating * 100) / 5;
  const width = `w-[${percentage}%]`;
  return (
    <div className="flex gap-2 items-center">
      {rating}

      <div className="relative h-6 w-[120px]">
        <div className="absolute top-0 right-0 left-0 bottom-0 flex">
          <StarIcon className="w-6" />
          <StarIcon className="w-6" />
          <StarIcon className="w-6" />
          <StarIcon className="w-6" />
          <StarIcon className="w-6" />
        </div>
        <div
          //   style={{}}
          style={{ width: `${percentage}%` }}
          className={`relative h-6  top-0 right-0 left-0 bottom-0 flex overflow-hidden`}
        >
          <StarIcon className=" fill-yellow-500 absolute w-6 top-0 left-0" />
          <StarIcon className=" fill-yellow-500 absolute w-6 top-0 left-6" />
          <StarIcon className=" fill-yellow-500 absolute w-6 top-0 left-12" />
          <StarIcon className=" fill-yellow-500 absolute w-6 top-0 left-[72px]" />
          <StarIcon className=" fill-yellow-500 absolute w-6 top-0 left-24" />
        </div>
      </div>
    </div>
  );
}

export default StarRating;
