import React from "react";
import OrderCard from "./OrderCard";
function Orders({ orders }: { orders: any }) {
  const onGoinngOrders: any = [];
  const completedOrders: any = [];
  orders.map((order: any) => {
    if (order.IsCompleted) {
      completedOrders.push(order);
    } else {
      onGoinngOrders.push(order);
    }
  });
  return (
    <div>
      <div className="text-center text-3xl font-semibold">Your Orders</div>
      <div className="text-2xl">Total Orders: {orders.length}</div>
      {onGoinngOrders.length > 0 && (
        <div>
          <div className="my-5">Ongoing Orders:</div>
          <div className="space-y-5">
            {onGoinngOrders.map((order: any) => {
              return <OrderCard Order={order} key={order.id} />;
            })}
          </div>
        </div>
      )}
      {completedOrders.length > 0 && (
        <div>
          <div className="my-5">Completed Orders:</div>
          <div className="space-y-5">
            {completedOrders.map((order: any) => {
              return <OrderCard Order={order} key={order.id} />;
            })}
          </div>
        </div>
      )}
      <div className="space-y-5"></div>
    </div>
  );
}
export default Orders;
