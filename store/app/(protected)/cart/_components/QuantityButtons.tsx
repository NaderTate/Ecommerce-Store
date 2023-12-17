"use client";

import { useState } from "react";

import { updateItemQuantity } from "@/actions/cart";

import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

type Props = {
  quantity: number;
  id: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuantityButtons = ({ quantity, id, setLoading }: Props) => {
  const [quantity_, setQuantity] = useState(quantity || 1);

  return (
    <div className="grid grid-cols-3 items-center justify-around gap-1 w-20 m-auto">
      <FaCircleMinus
        className="cursor-pointer m-auto"
        onClick={async () => {
          if (quantity_ === 1) return; // prevent negative quantity
          setLoading(true);
          await updateItemQuantity(id, quantity_ - 1);
          setLoading(false);
          setQuantity(quantity_ - 1);
        }}
      />
      <span className="text-center font-bold">{quantity_}</span>
      <FaCirclePlus
        className="cursor-pointer m-auto"
        onClick={async () => {
          setLoading(true);
          await updateItemQuantity(id, quantity_ + 1);
          setLoading(false);
          setQuantity(quantity_ + 1);
        }}
      />
    </div>
  );
};

export default QuantityButtons;
