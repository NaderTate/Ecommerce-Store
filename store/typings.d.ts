import { Address, Order, OrderSummary } from "@prisma/client";

interface Order extends Order {
  OrderSummary: OrderSummary;
  Address: Address;
  Products: {
    Product: ProductCardProps;
    Quantity: number;
  }[];
}

type OrderSummary_ = {
  subtotal: number;
  CODFee: number;
  Shipping: number;
  voucher: number;
  orderTotal: number;
  total: number;
};

type ProductCardProps = {
  id: string;
  Title: string;
  Price: number;
  mainImg: string;
  secondImage: string;
};
