"use client";

import { Divider, Input, Button } from "@nextui-org/react";

import OrderSummaryCard from "@/components/OrderSummaryCard";

import AddressSection from "./AddressSection";
import PaymentMethodSection from "./PaymentMethodSection";
import { useHandleOrderSummary } from "../_hooks/useHandleOrderSummary";

type Props = {
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
  addresses: { id: string; City: string; Street: string; Building: string }[];
  paymentCards: { id: string; CardNumber: string; HolderName: string | null }[];
};

function Main({ userId, cartItems, subtotal, addresses, paymentCards }: Props) {
  const { summary, setSummary, onSubmitOrder, loading } = useHandleOrderSummary(
    {
      userId,
      subtotal,
      cartItems,
      defaultAddressId: addresses[0]?.id,
    }
  );

  return (
    <div className="flex  sm:flex-row flex-col justify-between gap-12">
      <div className="w-full ">
        <AddressSection
          addresses={addresses}
          userId={userId}
          setAddress={setSummary.setAddressId}
        />
        <Divider className="mt-5" />
        <PaymentMethodSection
          userId={userId}
          paymentCards={paymentCards}
          PaymentMethod={summary.PaymentMethod}
          setPaymentMethod={setSummary.setPaymentMethod}
        />
        <Divider className="mt-5" />
        <Input
          label="Enter coupon code"
          className="w-80 my-5"
          endContent={<Button color="primary">Apply</Button>}
        />
      </div>
      <div className="w-full sm:w-[480px] space-y-5">
        <div className=" w-full bg-default-50 p-5 rounded-md">
          <span className="font-bold ">Order summary:</span>
          <div className="space-y-2 mt-2">
            <OrderSummaryCard summary={{ ...summary, subtotal }} />
          </div>
        </div>
        <Button
          isLoading={loading}
          isDisabled={
            summary.PaymentMethod == "" || loading || cartItems.length == 0
          }
          fullWidth
          color="primary"
          onPress={onSubmitOrder}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}

export default Main;
