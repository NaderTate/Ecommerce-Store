import React from "react";

type Props = {
  summary: {
    subtotal: number;
    Shipping: number;
    CODFee: number;
    total: number;
    voucher: number;
    orderTotal: number;
  };
};

const OrderSummary = ({ summary }: Props) => {
  return (
    <>
      <div className="flex justify-between">
        <div>items:</div>
        <div>${summary.subtotal}</div>
      </div>
      <div className="flex justify-between">
        <div>Shipping:</div>
        <div>${summary.Shipping}</div>
      </div>
      <div className="flex justify-between">
        <div>Cash on delivery fee:</div>
        <div>${summary.CODFee}</div>
      </div>
      <div className="flex justify-between">
        <div>Total:</div>
        <div>${summary.total}</div>
      </div>
      <div className="flex justify-between">
        <div>Coupon:</div>
        <div>${summary.voucher}</div>
      </div>
      <hr />
      <div className="flex justify-between">
        <div className="font-bold text-lg">Order Total:</div>
        <div>${summary.orderTotal}</div>
      </div>
    </>
  );
};

export default OrderSummary;
