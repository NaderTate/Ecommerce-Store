"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { SendToWhatsApp, placeOrder } from "@/actions/orders";

export const useHandleOrderSummary = (params: {
  userId: string;
  subtotal: number;
  cartItems: {
    Product: {
      Title: string;
      Price: number;
    };
    id: string;
    Quantity: number;
  }[];
  defaultAddressId: string;
}) => {
  const [PaymentMethod, setPaymentMethod] = useState("");
  const [addressId, setAddressId] = useState(params.defaultAddressId);
  const [Shipping, setShipping] = useState(5);
  const [CODFee, setCODFee] = useState(0);
  const [voucher, setVoucher] = useState(0);
  const [loading, setLoading] = useState(false);
  const total = Number((params.subtotal + Shipping + CODFee).toFixed(2));
  const orderTotal: number = Number((total - voucher).toFixed(2));

  const router = useRouter();

  useEffect(() => {
    if (PaymentMethod == "COD") {
      setCODFee(5);
    } else {
      setCODFee(0);
    }
  }, [PaymentMethod]);

  const onSubmitOrder = async () => {
    setLoading(true);
    router.prefetch("/thankyou");

    const { order } = await placeOrder(
      params.userId,
      PaymentMethod,
      addressId,
      params.cartItems,
      {
        CODFee,
        Shipping,
        voucher,
        orderTotal,
        total,
        subtotal: params.subtotal,
      }
    );

    await SendToWhatsApp(orderTotal, params.cartItems);
    setLoading(false);
    router.push(`/thankyou?orderID=${order?.id}`);
  };

  return {
    summary: {
      CODFee,
      Shipping,
      PaymentMethod,
      voucher,
      orderTotal,
      total,
    },
    setSummary: {
      setPaymentMethod,
      setAddressId,
      setShipping,
      setCODFee,
      setVoucher,
    },
    onSubmitOrder,
    loading,
  };
};
