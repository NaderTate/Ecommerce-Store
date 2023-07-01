import { prisma } from "@/lib/prisma";
import { Address, Order } from "@prisma/client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Slider from "./Slider";
async function OrderCard({ Order }: { Order: Order }) {
  const OrderDetails = await prisma.order.findUnique({
    where: { id: Order.id },
    select: {
      Address: true,
      Product: {
        select: { id: true, Title: true, mainImg: true, Price: true },
      },
    },
  });
  const {
    PaymentMethod,
    OrderTotal,
    PlacedOn,
    IsComplete,
    CompletedOn,
    OrderSummary,
  } = Order;
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
              <div>{address.Street}</div>
              <div>{address.Building}</div>
              <div>{address.City}</div>
              <div>{address.Landmark}</div>
              <div>{address.Country}</div>
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
        <Accordion type="single" collapsible className="border-none">
          <AccordionItem value="item-1">
            <div className="flex flex-col lg:flex-row gap-5 items-start">
              <div className="flex flex-col">
                <span>Placed on:</span>
                <span>{new Date(PlacedOn).toDateString()}</span>
              </div>
              <div className="flex flex-col">
                <span>Order total:</span>
                <span>${OrderTotal}</span>
              </div>
              <div className="lg:flex flex-col hidden">
                <span>Payment method:</span>
                <span>{PaymentMethod}</span>
              </div>
              <AccordionTrigger>
                <div className="flex gap-2">More details</div>
              </AccordionTrigger>
            </div>
            <AccordionContent className="">
              {OrderDetails && OrderSummary && (
                <MoreDetailsSection
                  OrderSummary={OrderSummary}
                  address={OrderDetails.Address}
                  PaymentMethod={PaymentMethod}
                />
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="ml-5 mt-5">
        {IsComplete && (
          <div className="font-bold text-2xl">Delivered on:{CompletedOn}</div>
        )}
        <div>
          <Slider title="" data={OrderDetails?.Product} />
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
