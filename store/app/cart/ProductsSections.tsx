import React from "react";

type Props = {
  userId: string;
  data: {
    product: {
      id: string;
      mainImg: string;
      secondImage: string;
      Title: string;
      Price: number;
    };
    id: string;
    Quantity: number;
  }[];
};

const ProductsSections = ({ userId, data }: Props) => {
  return <div>ProductsSections</div>;
};

export default ProductsSections;
