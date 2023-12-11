"use client";
import {
  RadioGroup,
  Radio,
  Divider,
  Spacer,
  Accordion,
  AccordionItem,
  Input,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { Address, Card } from "@prisma/client";
import AddressForm from "../account/AddressForm";
import PaymentCardForm from "../account/PaymentCardForm";
import OrderSummary from "../checkout/OrderSummary";
import { useHandleOrderSummary } from "../hooks/useHandleOrderSummary";
function CheckoutForm({
  userId,
  cartItems,
  subtotal,
  addresses,
  paymentCards,
}: {
  userId: string;
  cartItems: {
    Product: {
      Title: string;
      Price: number;
    };
    id: string;
    Quantity: number;
  }[];
  subtotal: number;
  addresses: Address[];
  paymentCards: Card[];
}) {
  const { summary, setSummary, onSubmitOrder, loading } = useHandleOrderSummary(
    {
      userId,
      subtotal,
      cartItems,
    }
  );
  return (
    <div>
      <div className="flex  sm:flex-row flex-col justify-between gap-12">
        <div className=" w-full ">
          <h1 className="text-xl font-bold tracking-wider ">
            Shipping address
          </h1>
          <Link className="text-sm underline" href={{ pathname: "/account" }}>
            Manage your addresses
          </Link>
          <Spacer y={4} />
          {addresses.length == 0 ? (
            <AddressForm userId={userId} />
          ) : (
            <RadioGroup
              defaultValue={addresses[0].id}
              onChange={(e) => console.log(e.target.value)}
            >
              {addresses.map((address) => (
                <Radio key={address.id} value={address.id}>
                  <p>
                    {address?.City}, {address?.Street}, {address?.Building}
                  </p>
                </Radio>
              ))}
            </RadioGroup>
          )}
          <Divider className="mt-5" />
          <h1 className="text-xl font-bold tracking-wider mt-5">
            Payment method
          </h1>
          <Link className="text-sm underline" href={{ pathname: "/account" }}>
            Manage your payment cards
          </Link>
          <Spacer y={2} />
          <RadioGroup
            value={summary.PaymentMethod}
            onValueChange={setSummary.setPaymentMethod}
          >
            <Accordion isCompact>
              <AccordionItem
                key="1"
                aria-label="Credit / Debit card"
                title="Credit / Debit card"
              >
                {paymentCards.length == 0 ? (
                  <PaymentCardForm userId={userId} />
                ) : (
                  <div className="flex flex-col gap-2">
                    {paymentCards.map((card) => (
                      <Radio key={card.id} value={card.id}>
                        <p>
                          {card?.CardNumber} - {card?.HolderName}
                        </p>
                      </Radio>
                    ))}
                  </div>
                )}
              </AccordionItem>
            </Accordion>

            <Radio value="paypal">
              <p>Paypal</p>
            </Radio>
            <Radio value="COD">
              <p>Cash on delivery</p>
            </Radio>
          </RadioGroup>
          <Divider className="mt-5" />

          <Input
            label="Enter coupon code"
            className="w-80 my-5"
            endContent={<Button color="primary">Apply</Button>}
          />

          <Button
            isLoading={loading}
            color="primary"
            size="lg"
            isDisabled={
              summary.PaymentMethod == "" || loading || cartItems.length == 0
            }
            onPress={onSubmitOrder}
            className="hidden sm:block"
          >
            Place Order
          </Button>
        </div>
        <div className="w-full sm:w-[480px] mr-5">
          <div className=" w-full bg-default-50 p-5 rounded-md">
            <span className="font-bold ">Order summary:</span>
            <div className="space-y-2 mt-2">
              <OrderSummary summary={{ ...summary, subtotal }} />
              <Button
                isLoading={loading}
                isDisabled={
                  summary.PaymentMethod == "" ||
                  loading ||
                  cartItems.length == 0
                }
                color="primary"
                onPress={onSubmitOrder}
                className={`sm:hidden`}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
