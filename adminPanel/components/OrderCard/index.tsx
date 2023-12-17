"use client";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { PiSealCheckBold } from "react-icons/pi";
import { FiTruck } from "react-icons/fi";
import { Order } from "@/typings";
import ProductsCarousel from "./ProductsCarousel";
import OrderAddress from "./OrderAddress";
import OrderSummary from "./OrderSummary";
import { markOrderAsComplete } from "@/app/server_actions/orders";
import { useState } from "react";
import { currencySymbol } from "@/lib/global_variables";

type Props = {
  order: Order;
};
function OrderCard({ order }: Props) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="border-2 border-divider rounded-md bg-white dark:bg-inherit my-3">
      <div className="border-b-2 border-divider p-5 ">
        <div className="flex flex-col xl:flex-row gap-5 items-start">
          <div className="flex flex-col flex-shrink-0">
            <span>Placed on: </span>
            <span>{new Date(order.createdAt).toDateString()}</span>
          </div>
          <div className="flex flex-col flex-shrink-0">
            <span>Order total:</span>
            <span>
              {currencySymbol}
              {order.OrderTotal}
            </span>
          </div>
          <div className="lg:flex flex-col flex-shrink-0 hidden">
            <span>Payment method:</span>
            <span>{order.PaymentMethod}</span>
          </div>
          <div className="flex-shrink-0">
            {order.IsComplete ? (
              <div className="flex  items-center  rounded-md  px-3 py-1 gap-2 bg-green-300">
                <h1 className="font-semibold text-green-800">Complete</h1>
                <PiSealCheckBold size={24} color="rgb(22 101 52)" />{" "}
              </div>
            ) : (
              <div className="flex  items-center  rounded-md  px-3 py-1 gap-2 bg-yellow-300">
                <h1 className="font-semibold text-yellow-800">In progress</h1>
                <FiTruck size={24} color="rgb(133 77 14 )" />
              </div>
            )}
          </div>
          {!order.IsComplete && (
            <Button
              isLoading={loading}
              isDisabled={loading}
              className=" mr-0  "
              onPress={async () => {
                setLoading(true);
                await markOrderAsComplete(order.id);
                setLoading(false);
              }}
            >
              Mark as complete
            </Button>
          )}
        </div>
      </div>
      <div className="ml-5 mt-5">
        {order.IsComplete && (
          <div className="font-bold text-2xl">
            Delivered on: {new Date(order.CompletedOn).toDateString()}
          </div>
        )}
        <Accordion isCompact>
          <AccordionItem title="More details">
            <>
              <div className="text-lg  lg:hidden">
                <h1>Payment method:</h1>
                <div>{order.PaymentMethod}</div>
              </div>
              <div className="flex flex-col md:flex-row gap-5 mt-5">
                <OrderAddress address={order.Address} />
                <div className="border rounded-md p-5 space-y-2 text-lg mt-2 bg-gray-100 dark:bg-inherit">
                  <div className="w-full rounded-md">
                    <div className="space-y-2">
                      <span className="font-bold">Order Summary:</span>
                      <OrderSummary summary={order.OrderSummary} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          </AccordionItem>
        </Accordion>
        <div>
          <ProductsCarousel
            data={order.Products.map((product) => {
              return {
                ...product.Product,
              };
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
