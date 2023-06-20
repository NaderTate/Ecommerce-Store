"use client";
import React, { useState } from "react";
import { addToCartAction } from "../_actions";
import RiseLoader from "react-spinners/RiseLoader";

function BuyOptions({ userId, id }: { userId: string; id: string }) {
  const [loading, setLoading] = useState(false);
  const buttonStyle =
    "w-full sm:w-56 h-12 rounded-md cursor-pointer font-bold text-white ";

  return (
    <div>
      {userId && (
        <div className="sm:flex-row flex flex-col gap-5 sm:gap-10">
          <button
            onClick={async () => {
              setLoading(true);
              await addToCartAction(userId, { id });
              setLoading(false);
            }}
            className={buttonStyle + " bg-blue-700"}
          >
            {loading ? <RiseLoader color="#ffffff" size={7} /> : "Add to cart"}
          </button>
          <button className={buttonStyle + " bg-blue-950"}>Buy now</button>
        </div>
      )}
    </div>
  );
}

export default BuyOptions;
