import React from "react";
import Image from "next/image";
import Link from "next/link";
function UserCard({
  id,
  Name,
  Image: UserImage,
  Email,
  OrdersCount,
}: {
  id: string;
  Name: string;
  Image: string;
  Email: string;
  OrdersCount: number;
}) {
  return (
    <div className="h-32">
      <Link href={{ pathname: `/users/${id}` }}>
        <div className="relative w-32 h-32 float-left mr-5">
          <Image
            fill
            src={UserImage}
            alt={"Product image"}
            className="rounded-md object-cover "
          />
        </div>
      </Link>
      <div className="space-y-2">
        <h1 className="font-semibold">{Name}</h1>
        <h1 className="text-xs">{Email}</h1>
        <h1 className="font-bold">{OrdersCount} Orders</h1>
        <Link href={{ pathname: `/users/${id}` }}>
          <button className="block bg-blue-700 px-3 py-1 rounded-md text-white mt-2 font-semibold">
            More details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UserCard;
