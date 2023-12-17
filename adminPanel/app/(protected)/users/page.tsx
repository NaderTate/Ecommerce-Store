import prisma from "@/lib/prisma";

import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import UserCard from "@/app/(protected)/users/_components/UserCard";
import ContentCountDisplay from "@/components/ContentCountDisplay";

import { itemsPerPage } from "@/lib/global_variables";
export const metadata = {
  title: "Users",
  description: "Nader Express users",
};
type Props = {
  searchParams: {
    page?: number;
    search?: string;
  };
};
async function page({ searchParams }: Props) {
  const pageNumber = searchParams.page || 1;
  const search = searchParams.search ?? "";
  const count = await prisma.customer.count({
    where: {
      Name: {
        contains: search || "",
        mode: "insensitive",
      },
    },
  });
  const users = await prisma.customer.findMany({
    orderBy: { id: "desc" },
    where: {
      Name: {
        contains: search || "",
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      Name: true,
      Email: true,
      Image: true,
      Orders: { select: { id: true } },
      createdAt: true,
      Review: { select: { id: true } },
    },
    take: itemsPerPage,
    skip: (pageNumber - 1) * itemsPerPage,
  });
  return (
    <div className="flex flex-col min-h-screen">
      <SearchInput page="users" />
      <ContentCountDisplay
        count={count}
        content="users"
        itemsToShow={itemsPerPage}
        pageNumber={pageNumber}
        className="mt-5"
      />
      <div className="grow">
        <div className="flex flex-wrap gap-5">
          {users.map(
            ({ id, Name, Email, Image, Orders, Review, createdAt }) => {
              return (
                <UserCard
                  key={id}
                  id={id}
                  Name={Name}
                  Email={Email}
                  Image={Image}
                  OrdersCount={Orders.length}
                  createdAt={createdAt}
                  reviewsCount={Review.length}
                />
              );
            }
          )}
        </div>
      </div>
      <Pagination
        page="users"
        total={Math.ceil(count / itemsPerPage)}
        queries={{ search }}
      />
    </div>
  );
}

export default page;
