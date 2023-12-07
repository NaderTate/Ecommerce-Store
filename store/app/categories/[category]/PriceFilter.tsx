import Link from "next/link";
import React from "react";

type Props = {
  pricesList: number[];
  link: string;
  otherQueries: { [key: string | number]: string | number };
};

const PriceFilter = ({ link, otherQueries, pricesList }: Props) => {
  return (
    <div className="flex flex-col items-start">
      {pricesList.map((price, i) => {
        {
          // if the price is the first in the list (the lowest price) display "under $price"
          if (i == 0) {
            return (
              <Link
                key={price}
                href={{
                  pathname: link,
                  query: { max: price, ...otherQueries },
                }}
              >
                Under ${price}
              </Link>
            );
          }
          // if the price is the last in the list (the highest price) display "above $price"
          else if (i == pricesList.length - 1) {
            return (
              <Link
                key={price}
                href={{
                  pathname: link,
                  query: { min: pricesList[i - 1], ...otherQueries },
                }}
              >
                Above ${pricesList[i - 1]}
              </Link>
            );
          }
          // if the price is in the middle of the list display "$price to $price"
          else {
            return (
              <Link
                key={price}
                href={{
                  pathname: link,
                  query: {
                    min: pricesList[i - 1],
                    max: price,
                    ...otherQueries,
                  },
                }}
              >
                ${pricesList[i - 1]} to ${price}
              </Link>
            );
          }
        }
      })}
    </div>
  );
};

export default PriceFilter;
