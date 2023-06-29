import { prisma } from "@/lib/prisma";
import { Address, Order } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  }: {
    OrderSummary: any;
    address: Address;
  }) => {
    return (
      <div>
        <div className="flex gap-5 mt-5">
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
        <Accordion
          type="single"
          collapsible
          className="w-fulls p-0 border-none"
        >
          <AccordionItem value="item-1">
            <div className="flex gap-10 items-start">
              <div className="flex flex-col">
                <span>Placed on:</span>
                <span>{new Date(PlacedOn).toDateString()}</span>
              </div>
              <div className="flex flex-col">
                <span>Order total:</span>
                <span>${OrderTotal}</span>
              </div>
              <div className="flex flex-col">
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
                />
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="space-y-5 p-5">
        {IsComplete && (
          <div className="font-bold text-2xl">Delivered {CompletedOn}</div>
        )}
        {OrderDetails?.Product.map(({ id, Title, mainImg, Price }) => {
          const quantity: any = Order?.Orders?.find(
            (order: any) => order?.id == id
          );

          return (
            <div key={id} className="flex gap-5">
              <Link href={{ pathname: `/products/${id}` }}>
                <div className="relative w-28 h-28">
                  <Image
                    fill
                    src={mainImg}
                    className=" object-cover rounded-md"
                    alt={Title}
                  />
                  <span className="absolute top-0 right-0 bg-black/50 rounded-bl-md text-white p-[2px]">
                    {quantity.quantity}
                  </span>
                </div>
              </Link>
              <div>
                <Link href={{ pathname: `/products/${id}` }}>
                  <p>{Title}</p>
                  <p>${Price}</p>
                </Link>
                <div className="flex gap-5">
                  <button className="bg-blue-700 px-2 rounded-md text-white mt-2">
                    Buy again
                  </button>
                  <div></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderCard;
