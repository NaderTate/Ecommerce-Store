import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import UserCard from "@/app/(protected)/users/_components/UserCard";
export const metadata = {
  title: "Users",
  description: "Nader Express users",
};
async function page({ searchParams }: any) {
  const sk = searchParams.page || 1;
  const itemsToShow = 30;
  const count = await prisma.customer.count();

  const users = await prisma.customer.findMany({
    orderBy: { id: "desc" },
    select: {
      id: true,
      Name: true,
      Email: true,
      Image: true,
      Orders: { select: { id: true } },
    },
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
  });
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <p className="my-5">
          Displaying {(sk - 1) * itemsToShow}-
          {(count - (sk - 1) * itemsToShow) / itemsToShow > 1
            ? sk * itemsToShow
            : count}{" "}
          of {count} users
        </p>
        <div className="flex flex-wrap gap-5 grow">
          {users.map(({ id, Name, Email, Image, Orders }) => {
            return (
              <UserCard
                key={id}
                id={id}
                Name={Name}
                Email={Email}
                Image={Image}
                OrdersCount={Orders.length}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default page;
