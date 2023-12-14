import React from "react";
import OrderCard from "../components/OrderCard";
import prisma from "@/lib/prisma";
async function page() {
  const orders = await prisma.order.findMany({ orderBy: { id: "desc" } });
  return (
    <div>
      <div className="my-5 font-bold">Total Order: {orders?.length}</div>
      <div className="space-y-5">
        {orders?.map((order) => {
          return <OrderCard key={order.id} Order={order} />;
        })}
      </div>
    </div>
  );
}

export default page;
