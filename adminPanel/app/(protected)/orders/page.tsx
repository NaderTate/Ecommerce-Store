import prisma from "@/lib/prisma";
import OrderCard from "@/app/components/OrderCard";
async function page() {
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
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <div className="my-5 font-bold">Total Order: {orders?.length}</div>
      <div className="space-y-5">
        {orders?.map((order) => {
          return <OrderCard key={order.id} order={order} />;
        })}
      </div>
    </>
  );
}

export default page;
