"use client";

import FilterButton from "./FilterButton";

type Props = {
  pricesList?: number[];
  onChange: (min: number | undefined, max: number | undefined) => void;
};
const PriceFilter = ({ pricesList, onChange }: Props) => {
  return (
    <div className="flex flex-col items-start ">
      {pricesList?.map((price, i) => {
        {
          // if the price is the first in the list (the lowest price) display "under $price"
          if (i == 0) {
            return (
              <FilterButton
                key={price}
                onClick={() => onChange(undefined, price)}
              >
                Under ${price}
              </FilterButton>
            );
          }
          // if the price is the last in the list (the highest price) display "above $price"
          else if (i == pricesList.length - 1) {
            return (
              <FilterButton
                key={price}
                onClick={() => onChange(price, undefined)}
              >
                Above ${price}
              </FilterButton>
            );
          }
          // if the price is in the middle of the list display "$price to $price"
          else {
            return (
              <FilterButton
                key={price}
                onClick={() => onChange(price, pricesList[i + 1])}
              >
                ${price} to ${pricesList[i + 1]}
              </FilterButton>
            );
          }
        }
      })}
    </div>
  );
};

export default PriceFilter;
