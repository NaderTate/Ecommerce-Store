"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Address } from "@prisma/client";

import { PiSealCheckBold } from "react-icons/pi";
import { FiTruck } from "react-icons/fi";
import ProductsCarousel from "./ProductsCarousel";
import { Order } from "@/typings";

type Props = {
  order: Order;
};
async function OrderCard({ order }: Props) {
  const MoreDetailsSection = ({
    OrderSummary,
    address,
    PaymentMethod,
  }: {
    OrderSummary: any;
    address: Address;
    PaymentMethod: string;
  }) => {
    return (
      <div>
        <div className="text-lg  lg:hidden">
          <h1>Payment method:</h1>
          <div>{PaymentMethod}</div>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-5 mt-5">
          <div>
            <div className="border rounded-md p-5 space-y-2 text-lg mt-2 bg-gray-100 dark:bg-inherit">
              <span className="font-bold">Shipped to:</span>
              <div className="flex gap-10 justify-between">
                <span>Street: </span>
                <span>{address.Street}</span>
              </div>
              <div className="flex gap-10 justify-between">
                <span>Building:</span>
                <span> {address.Building}</span>
              </div>
              <div className="flex gap-10 justify-between">
                <span>City:</span> <span>{address.City}</span>
              </div>
              <div className="flex gap-10 justify-between">
                <span>Landmark:</span> <span>{address.Landmark}</span>
              </div>
              <div className="flex gap-10 justify-between">
                <span>Country:</span> <span>{address.Country}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="border rounded-md p-5 space-y-2 text-lg mt-2 bg-gray-100 dark:bg-inherit">
              <div className="  w-full rounded-md">
                <div className="space-y-2">
                  <span className="font-bold">Order Summary:</span>
                  <div className="flex justify-between">
                    <div>items:</div>
                    <div>${OrderSummary.Items}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Shipping:</div>
                    <div>${OrderSummary.Shipping}</div>
                  </div>
                  <div className="flex justify-between gap-5">
                    <div>Cash on delivery fee:</div>
                    <div>${OrderSummary.CODFee}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Total:</div>
                    <div>${OrderSummary.Total}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Coupon:</div>
                    <div>${OrderSummary.Coupon}</div>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <div className="font-bold text-lg">Order Total:</div>
                    <div>${OrderSummary.OrderTotal}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
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
          <Accordion isCompact>
            <AccordionItem title="More details">
              <MoreDetailsSection
                OrderSummary={order.OrderSummary}
                address={order.Address}
                PaymentMethod={order.PaymentMethod}
              />
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="ml-5 mt-5">
        {order.IsComplete && (
          <div className="font-bold text-2xl">
            Delivered on:{new Date(order.CompletedOn).toDateString()}
          </div>
        )}
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
