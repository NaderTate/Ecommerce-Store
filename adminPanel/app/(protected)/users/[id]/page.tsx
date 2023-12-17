import prisma from "@/lib/prisma";

import Image from "next/image";
import { Image as NUIImage } from "@nextui-org/react";

import UserTabs from "../_components/UserTabs";
import BanButton from "../_components/BanButton";
import UserInfoCard from "../_components/UserInfoCard";

async function page({ params: { id } }: { params: { id: string } }) {
  const user = await prisma.customer.findUnique({
    where: { id },
    include: {
      Orders: {
        include: {
          Products: { include: { Product: true } },
          OrderSummary: true,
          Address: true,
        },
      },
      Review: {
        select: {
          id: true,
          Rating: true,
          Comment: true,
          createdAt: true,
          Product: { select: { mainImg: true, id: true } },
          User: { select: { Name: true, Image: true, id: true } },
        },
      },
      Address: true,
      WhishList: {
        include: {
          Product: true,
        },
      },
    },
  });

  return (
    user && (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <NUIImage
              as={Image}
              width={150}
              height={150}
              src={user?.Image}
              fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/9/9e/Placeholder_Person.jpg"
              alt={user?.Name}
              className="rounded-md object-cover"
            />
            <h1 className="text-3xl">{user.Name}</h1>
            <h1 className="text-xl">
              Joined on {user.createdAt.toDateString()}
            </h1>
            <BanButton id={user.id} />
          </div>
          <UserInfoCard
            user={{
              BirthDate: user.BirthDate,
              Email: user.Email,
              Gender: user.Gender,
              Phone: user.Phone,
              OrdersCount: user.Orders.length,
              CommentsCount: user.Review.length,
            }}
          />
        </div>
        <UserTabs user={user} />
      </>
    )
  );
}

export default page;
