"use client";
import { createProductAction } from "../_actions";
const TempProduct = () => {
  return (
    <div>
      <button
        className="text-black"
        onClick={async () => {
          await createProductAction("hi", 69, [], "", "des", [], [], []);
        }}
      >
        CLICK MEEE!!
      </button>
    </div>
  );
};

export default TempProduct;
