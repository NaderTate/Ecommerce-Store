import { ProductCardProps } from "@/typings";
import ProductCard from "../ProductCard";
import Link from "next/link";

type Props = {
  cart: {
    cartItems: {
      Product: ProductCardProps;
      Quantity: number;
    }[];
    totalCount: number;
    totalPrice: number;
  } | null;
};

const CartSection = ({ cart }: Props) => {
  return (
    <div className="p-5 dark:text-white">
      <div className="flex flex-wrap w-[750px] gap-5 items-center">
        {cart?.cartItems && cart?.cartItems?.length > 0
          ? cart?.cartItems.map(({ Product, Quantity }) => {
              return (
                <div key={Product.id} className="w-36">
                  <ProductCard product={Product} quantity={Quantity} />
                </div>
              );
            })
          : "Your cart is empty :("}
        {cart && cart?.totalCount > 7 && (
          <div className="">
            <Link
              className="font-bold tracking-wider"
              href={{ pathname: "/cart" }}
            >
              +{cart?.totalCount - 7} more items
            </Link>
          </div>
        )}
      </div>
      {cart && cart?.totalCount > 0 && (
        <Link className="font-bold tracking-wider" href={{ pathname: "/cart" }}>
          Review and checkout (${cart?.totalPrice.toFixed(2)})
        </Link>
      )}
    </div>
  );
};

export default CartSection;
