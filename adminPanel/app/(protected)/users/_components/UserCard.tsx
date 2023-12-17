import Link from "next/link";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";

function UserCard({
  id,
  Name,
  Image: UserImage,
  Email,
  OrdersCount,
  createdAt,
  reviewsCount,
}: {
  id: string;
  Name: string;
  Image: string;
  Email: string;
  OrdersCount: number;
  createdAt: Date;
  reviewsCount: number;
}) {
  return (
    <Link
      href={{ pathname: `/users/${id}` }}
      className="border-2 border-divider rounded-md p-2 w-80"
    >
      <div className="flex items-center gap-2">
        <Avatar
          name={Name}
          src={UserImage}
          showFallback
          fallback={Name?.split(" ")?.[0]?.[0] + Name.split(" ")?.[1]?.[0]}
        />

        <div>
          <h5 className="font-semibold">{Name}</h5>
          <h6 className="text-xs">{Email}</h6>
        </div>
      </div>
      <div className="space-y-2 mt-2">
        <h6 className="text-sm ">
          Joined on: {new Date(createdAt).toDateString()}
        </h6>
        <h1 className="">{OrdersCount} Orders</h1>
        <h1 className="">{reviewsCount} Reviews</h1>
      </div>
    </Link>
  );
}

export default UserCard;
