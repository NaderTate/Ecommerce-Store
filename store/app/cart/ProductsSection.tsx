import { ProductCardProps } from "@/typings";
import ProductCard from "./ProductCard";
import { Divider } from "@nextui-org/react";

type Props = {
  userId: string;
  data: {
    Product: ProductCardProps;
    id: string;
    Quantity: number;
  }[];
};

const ProductsSection = ({ userId, data }: Props) => {
  return (
    <>
      {data.map(({ Product, Quantity, id }) => {
        return (
          <>
            <ProductCard
              key={Product.id}
              id={id}
              userId={userId}
              product={Product}
              quantity={Quantity}
            />
            <Divider className="my-3" />
          </>
        );
      })}
    </>
  );
};

export default ProductsSection;
