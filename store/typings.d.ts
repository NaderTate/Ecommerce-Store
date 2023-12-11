import { Address, Order } from "@prisma/client";

interface Order extends Order {
  OrderSummary: any;
  Address: Address;
  Products: {
    Product: {
      id: string;
      Title: string;
      Price: number;
      mainImg: string;
      secondImage: string;
    };
    Quantity: number;
  }[];
}
