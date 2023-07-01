import React from "react";
import NavLayout from "../components/NavLayout";
import OrderCard from "../components/OrderCard";
async function page() {
  const orders = await prisma?.order.findMany({ orderBy: { id: "desc" } });
  return (
    <div>
      <NavLayout>
        <div className="my-5 font-bold">Total Order: {orders?.length}</div>
        <div className="space-y-5">
          {orders?.map((order) => {
            return <OrderCard key={order.id} Order={order} />;
          })}
        </div>
      </NavLayout>
    </div>
  );
}

export default page;
