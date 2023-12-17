import { Order } from "@/typings";
import OrderCard from "./OrderCard";

function Orders({ orders }: { orders: Order[] }) {
  return (
    <>
      <h2 className="text-center text-3xl my-5 font-semibold">
        Your Orders <span className="text-xs">({orders.length})</span>
      </h2>
      {orders.length == 0 ? (
        <h2 className="text-xl text-center">You have no orders yet :(</h2>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            return <OrderCard order={order} key={order.id} />;
          })}
        </div>
      )}
    </>
  );
}
export default Orders;
