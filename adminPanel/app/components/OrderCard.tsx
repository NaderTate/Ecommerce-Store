import { Product } from "@prisma/client";
import React from "react";
function OrderCard({
  UserId,
  PaymentMethod,
  PlacedOn,
  IsComplete,
  CompletedOn,
  Address,
  Products,
}: {
  UserId: string;
  PaymentMethod: string;
  PlacedOn: string;
  IsComplete: boolean;
  Address: {
    Country: string;
    Street: string;
    City: string;
    Building: string;
    PostalCode: number;
    Landmark: string;
  };
  CompletedOn: string;
  Products: { Product: Product; quantity: number };
}) {
  return <div>OrderCard</div>;
}

export default OrderCard;
