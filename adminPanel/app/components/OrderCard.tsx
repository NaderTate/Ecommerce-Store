import prisma from "@/lib/prisma";
import { Address, Order } from "@prisma/client";
import { PiSealCheckBold } from "react-icons/pi";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Slider from "./Slider";
import MarkAsCompleteButton from "./MarkAsCompleteButton";
import Link from "next/link";
async function OrderCard({ Order }: { Order: Order }) {
  const OrderDetails = await prisma.order.findUnique({
    where: { id: Order.id },
    select: {
      Address: true,
      Product: {
        select: { id: true, Title: true, mainImg: true, Price: true },
      },
      User: { select: { id: true, Name: true, Email: true, Image: true } },
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
        <div className="text-lg mt-5 lg:m-0 lg:hidden">
          <h1>Payment method:</h1>
          <div>{PaymentMethod}</div>
        </div>
        <div className="flex gap-5 my-5 sm:items-center flex-col sm:flex-row items-start">
          <span className="font-semibold text-lg">Ordered by:</span>
          <Link href={{ pathname: `/user/${OrderDetails?.User.id}` }}>
            <div className="flex gap-5">
              <img
                src={OrderDetails?.User.Image}
                className="w-10 rounded-full"
                alt=""
              />
              <div>
                <h1>{OrderDetails?.User.Name}</h1>
                <h1>{OrderDetails?.User.Email}</h1>
              </div>
            </div>
          </Link>
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
              <div className=" lg:mr-0   lg:ml-auto my-auto">
                {Order.IsComplete ? (
                  <div className="flex  items-center  rounded-md  px-3 py-1 gap-2 bg-green-300">
                    <h1 className="font-semibold text-green-800">Complete</h1>
                    <PiSealCheckBold size={24} color="rgb(22 101 52)" />{" "}
                  </div>
                ) : (
                  <MarkAsCompleteButton id={Order.id} />
                )}
              </div>
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
          <div className="font-bold text-2xl">
            Completed on: {new Date(CompletedOn).toDateString()}
          </div>
        )}
        <div>
          <Slider title="" data={OrderDetails?.Product} />
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
