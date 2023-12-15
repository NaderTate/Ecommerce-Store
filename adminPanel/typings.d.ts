import { Address, Order, OrderSummary } from "@prisma/client";

type CategoryProperty = {
  name: string;
  value: string;
};

type ProductFormProps = {
  product?: {
    id: string;
    Title: string;
    Price: number;
    Description: string;
    CategoryIDs: string[];
    Colors: string[];
    Images: { id: string; img: string }[] | any;
    Properties: CategoryProperty[] | any;
  };
  allCategories:
    | {
        id: string;
        label: string;
        value: number;
        Properties: CategoryProperty[];
      }[]
    | any;
};

type CategoryFormProps = {
  category?: {
    id: string;
    label: string;
    value: number;
    Image: string;
    Properties: CategoryProperty[] | any;
    ParentId: string | null;
    ProductsIDs: string[];
  };
  allCategories:
    | {
        id: string;
        label: string;
        value: number;
        Properties: CategoryProperty[];
      }[]
    | any;
};

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
};
