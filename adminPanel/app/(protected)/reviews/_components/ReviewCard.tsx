import Image from "next/image";
import StarRating from "./StarRating";
import Link from "next/link";
function ReviewCard({
  id,
  mainImg,
  User: { Name, Img, id: userId },
  Rating,
  Comment,
  Date,
}: {
  id: string;
  mainImg: string;
  User: { Name: string; Img: string; id: string };
  Rating: number;
  Comment: string;
  Date: Date;
}) {
  return (
    <div className="h-48">
      <Link href={{ pathname: `/products/${id}` }}>
        <div className="relative w-48 h-48 float-left mr-5">
          <Image
            fill
            src={mainImg}
            alt={"Product image"}
            className="rounded-md object-cover "
          />
        </div>
      </Link>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Link href={{ pathname: `/users/${userId}` }}>
            <div className="relative w-10 h-10">
              <Image
                src={Img}
                alt={Name}
                fill
                className="rounded-full object-cover"
              />
            </div>
          </Link>
          <span>{Name}</span>
          <span className="text-xs">({Date.toDateString()})</span>
        </div>
        <StarRating rating={Rating} hideNumber />
        <p>{Comment}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
