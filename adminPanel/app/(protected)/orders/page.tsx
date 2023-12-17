import prisma from "@/lib/prisma";

import OrderCard from "@/components/OrderCard";
import Pagination from "@/components/Pagination";

import { itemsPerPage } from "@/lib/global_variables";

type Props = {
  searchParams: {
    page?: number;
  };
};

async function page({ searchParams }: Props) {
  const pageNumber = searchParams.page || 1;
  const orders = await prisma.order.findMany({
    include: {
      Products: {
        include: {
          Product: {
            select: {
              id: true,
              Title: true,
              Price: true,
              mainImg: true,
            },
          },
        },
      },
      Address: true,
      OrderSummary: true,
    },
    skip: (pageNumber - 1) * itemsPerPage,
    take: itemsPerPage,
    orderBy: { createdAt: "desc" },
  });
  const count = await prisma.order.count();

  return (
    <>
      <div className="my-5 font-bold mt-10 sm:mt-0">
        Total Order: {orders?.length}
      </div>
      <div className="space-y-5">
        {orders?.map((order) => {
          return <OrderCard key={order.id} order={order} />;
        })}
      </div>
      <Pagination page="orders" total={Math.ceil(count / itemsPerPage)} />
    </>
  );
}

export default page;
