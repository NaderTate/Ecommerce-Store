import Link from "next/link";
import Image from "next/image";

import StarRating from "./StarRating";

type Props = {
  id: string;
  mainImg: string;
  User: { Name: string; Img: string; id: string };
  Rating: number;
  Comment: string;
  Date: Date;
};
function ReviewCard({
  id,
  mainImg,
  User: { Name, Img, id: userId },
  Rating,
  Comment,
  Date,
}: Props) {
  return (
    <div className="rounded-md p-2 border-divider border-2 w-96">
      <div className="flex gap-2 items-center">
        <Link href={{ pathname: `/products/${id}` }}>
          <Image
            width={100}
            height={100}
            src={mainImg}
            alt={"Product image"}
            className="rounded-md object-contain "
          />
        </Link>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Link href={{ pathname: `/users/${userId}` }}>
              <Image
                width={40}
                height={40}
                src={Img}
                alt={Name}
                className="rounded-full object-cover"
              />
            </Link>
            <div>
              <span>{Name}</span>
              <span className="text-xs block text-default-500">
                ({Date.toDateString()})
              </span>
            </div>
          </div>
          <StarRating rating={Rating} hideNumber />
          <p>{Comment}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
