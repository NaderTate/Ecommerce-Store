import { Divider } from "@nextui-org/react";
import { OrderSummary_ } from "@/typings";
import { currencySymbol } from "@/lib/global_variables";

type Props = {
  summary: OrderSummary_;
};

const OrderSummary = ({ summary }: Props) => {
  return (
    <>
      <div className="flex justify-between">
        <div>items:</div>
        <div>
          <span className="text-xs">{currencySymbol}</span>
          {summary.subtotal}
        </div>
      </div>
      <div className="flex justify-between">
        <div>Shipping:</div>
        <div>
          <span className="text-xs">{currencySymbol}</span>
          {summary.Shipping}
        </div>
      </div>
      <div className="flex justify-between">
        <div>Cash on delivery fee:</div>
        <div>
          <span className="text-xs">{currencySymbol}</span>
          {summary.CODFee}
        </div>
      </div>
      <div className="flex justify-between">
        <div>Total:</div>
        <div>
          <span className="text-xs">{currencySymbol}</span>
          {summary.total}
        </div>
      </div>
      <div className="flex justify-between">
        <div>Coupon:</div>
        <div>
          <span className="text-xs">{currencySymbol}</span>
          {summary.voucher}
        </div>
      </div>
      <Divider />
      <div className="flex justify-between">
        <div className="font-bold text-lg">Order Total:</div>
        <div>
          <span className="text-xs">{currencySymbol}</span>
          {summary.orderTotal}
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
