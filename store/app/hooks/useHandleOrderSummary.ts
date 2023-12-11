"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SendToWhatsApp, placeOrder } from "../server_actions/orders";
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
}) => {
  const [PaymentMethod, setPaymentMethod] = useState("");
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
    await placeOrder(params.userId, PaymentMethod, params.cartItems, {
      Items: params.subtotal,
      Shipping,
      CODFee,
      Total: total,
      Coupon: voucher,
      OrderTotal: orderTotal,
    });
    await SendToWhatsApp(orderTotal, params.cartItems);
    setLoading(false);
    // router.push(`/thankyou?orderID=${Order?.id}`);
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
      setShipping,
      setCODFee,
      setVoucher,
    },
    onSubmitOrder,
    loading,
  };
};
