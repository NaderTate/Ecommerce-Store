"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

import OrderAddress from "./OrderAddress";
import ProductsCarousel from "@/components/ProductsCarousel";
import OrderSummaryCard from "@/components/OrderSummaryCard";

import { Order } from "@/typings";

import { FiTruck } from "react-icons/fi";
import { PiSealCheckBold } from "react-icons/pi";

type Props = {
  order: Order;
};

async function OrderCard({ order }: Props) {
  return (
    <div className="border rounded-md bg-white dark:bg-inherit">
      <div className="border-b p-5 ">
        <div className="flex flex-col xl:flex-row gap-5 items-start">
          <div className="flex flex-col flex-shrink-0">
            <span>Placed on:</span>
            <span>{new Date(order.createdAt).toDateString()}</span>
          </div>
          <div className="flex flex-col flex-shrink-0">
            <span>Order total:</span>
            <span>${order.OrderTotal}</span>
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
        </div>
      </div>
      <div className="ml-5 mt-5">
        {order.IsComplete && (
          <div className="font-bold text-2xl">
            Delivered on:{new Date(order.CompletedOn).toDateString()}
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
                <div className="border rounded-md p-5 space-y-2 md:text-lg mt-2 bg-gray-100 dark:bg-inherit">
                  <div className="w-full rounded-md">
                    <div className="space-y-2">
                      <span className="font-bold">Order Summary:</span>
                      <OrderSummaryCard summary={order.OrderSummary} />
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
