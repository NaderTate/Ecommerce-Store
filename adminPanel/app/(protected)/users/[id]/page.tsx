import prisma from "@/lib/prisma";
import Image from "next/image";
import BanButton from "@/app/(protected)/users/_components/BanButton";
import UserTabs from "../_components/UserTabs";
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
    <div className="p-5">
      {user && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <div className="relative  w-36 h-36">
                <Image
                  fill
                  src={user?.Image}
                  alt={user?.Name}
                  className="rounded-md object-cover"
                />
              </div>
              <h1 className="text-3xl">{user.Name}</h1>
              <h1 className="text-xl">
                Joined on {user.createdAt.toDateString()}
              </h1>
              <BanButton id={user.id} />
            </div>
            <div className="">
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
          </div>
          <UserTabs user={user} />
        </>
      )}
    </div>
  );
}

export default page;
