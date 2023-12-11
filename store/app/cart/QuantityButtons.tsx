"use client";
import { useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { updateItemQuantity } from "../server_actions/cart";
type Props = {
  quantity: number;
  id: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuantityButtons = ({ quantity, id, setLoading }: Props) => {
  const [quantity_, setQuantity] = useState(quantity || 1);
  return (
    <div className="grid grid-cols-3 items-center justify-around gap-1 w-20 m-auto">
      <FaMinusCircle
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
      <FaPlusCircle
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
