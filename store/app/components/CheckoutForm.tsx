"use client";
import React, { useEffect, useState } from "react";
import { SendToWhatsAppAction, placeOrderAction } from "../_actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
function CheckoutForm({
  userId,
  cartItems,
  subtotal,
  address,
}: {
  userId: string;
  cartItems: Array<{ id: string; quantity: number }>;
  subtotal: number;
  address: {
    City: string;
    Street: string;
    Building: string;
    Landmark: string;
    Country: string;
  };
}) {
  const [PaymentMethod, setPaymentMethod] = useState("");
  const [Shipping, setShipping] = useState(1);
  const [CODFee, setCODFee] = useState(0);
  const [voucher, setVoucher] = useState(0);
  const total = subtotal + Shipping + CODFee;
  const orderTotal: number = total - voucher;
  useEffect(() => {
    if (PaymentMethod == "COD") {
      setCODFee(5);
    } else {
      setCODFee(0);
    }
  }, [PaymentMethod]);
  return (
    <div>
      <div className="flex  sm:flex-row flex-col justify-between gap-12">
        <div className="bg-white dark:bg-black/50 w-full p-5 rounded-md">
          <div className="flex flex-col md:flex-row justify-between mb-10">
            <h1 className="text-xl font-bold tracking-wider">
              Shipping address
            </h1>

            <div>
              {address.City}, {address.Street} <br /> {address.Landmark},
              {address.Building}
            </div>
            <button className="text-left mt-2 md:m-0">Change</button>
          </div>
          <h1 className="text-xl font-bold tracking-wider">Payment method</h1>
          <form className="mt-2">
            <input
              type="radio"
              id="credit"
              name="payment_method"
              value="credit"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="ml-2" htmlFor="credit">
              Credit/debit card
            </label>
            <br />
            <input
              type="radio"
              id="Paypal"
              name="payment_method"
              value="Paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="ml-2" htmlFor="Paypal">
              Paypal
            </label>
            <br />

            <input
              type="radio"
              id="COD"
              name="payment_method"
              value="COD"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="ml-2" htmlFor="COD">
              Cash on delivery
            </label>
          </form>

          <div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Gift card or promotion code:
                </AccordionTrigger>
                <AccordionContent>
                  <input
                    className="h-8 rounded-md px-2 mr-5"
                    type="text"
                    placeholder="Enter code"
                  />
                  <button className="bg-black/10 dark:bg-gray-800 h-8 px-2 rounded-md">
                    Apply
                  </button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <button
            onClick={async () => {
              await placeOrderAction(
                userId,
                cartItems,
                orderTotal,
                PaymentMethod,

                false,
                {
                  Items: subtotal,
                  Shipping,
                  CODFee,
                  Total: total,
                  Coupon: voucher,
                  OrderTotal: orderTotal,
                }
              );
              // await SendToWhatsAppAction(subtotal, cartItems);
            }}
            className="bg-blue-700 text-white rounded-md px-3 text-xl font-bold  mt-2 tracking-wider py-2 hidden sm:block"
          >
            Place Order
          </button>
        </div>
        <div className="w-full sm:w-[480px] mr-5">
          <div className="bg-white dark:bg-black/50 w-full rounded-md  p-5">
            <span className="font-bold ">Order summary:</span>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between">
                <div>items:</div>
                <div>${subtotal}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping:</div>
                <div>${Shipping}</div>
              </div>
              <div className="flex justify-between">
                <div>Cash on delivery fee:</div>
                <div>${CODFee}</div>
              </div>
              <div className="flex justify-between">
                <div>Total:</div>
                <div>${total}</div>
              </div>
              <div className="flex justify-between">
                <div>Coupon:</div>
                <div>${voucher}</div>
              </div>
              <hr />
              <div className="flex justify-between">
                <div className="font-bold text-lg">Order Total:</div>
                <div>${orderTotal}</div>
              </div>
              <button
                onClick={() => {
                  placeOrderAction(
                    userId,
                    cartItems,
                    orderTotal,
                    PaymentMethod,
                    false,
                    {
                      Items: subtotal,
                      Shipping,
                      CODFee,
                      Total: total,
                      Coupon: voucher,
                      OrderTotal: orderTotal,
                    }
                  );
                }}
                className="bg-blue-700 text-white rounded-md px-3 text-xl font-bold  mt-2 tracking-wider py-2  sm:hidden"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
