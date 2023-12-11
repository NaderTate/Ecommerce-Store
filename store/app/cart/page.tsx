import { auth } from "@clerk/nextjs";
import ProductCard from "./ProductCard";
import ProductsCarousel from "../components/ProductsCarousel";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCartItems } from "../server_actions/cart";
import { getWishlistItems } from "../server_actions/wishlist";
import { currencySymbol } from "../global_variables";
import { Button, Divider } from "@nextui-org/react";
import { IoIosArrowRoundForward } from "react-icons/io";
export const metadata = {
  metadataBase: new URL("https://naderexpress.vercel.app/"),
  title: "Cart",
  description: "manage your cart",
  openGraph: {
    title: "Cart",
    type: "website",
    locale: "en_US",
    url: "https://naderexpress.vercel.app/",
    siteName: "Nader Express",
    images: [
      {
        url: "https://res.cloudinary.com/dqkyatgoy/image/upload/v1628753046/Nader%20Express/Frame_1_a507eb.svg",
        width: 800,
        height: 600,
        alt: "Nader Express",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@naderexpress",
    title: "Cart",
    description: "manage your cart",
  },
};
async function page() {
  const { userId } = auth();

  if (!userId) redirect("/sign-in?redirectURL=cart");
  const { cartItems, totalPrice, totalCount } = await getCartItems(userId);
  const { wishlistItems } = await getWishlistItems(userId);

  return (
    <div className="px-5 sm:px-10 mt-20">
      <>
        <h1 className="text-2xl tracking-wider">Cart</h1>
        <Divider className="my-3" />
        <div
          className={`hidden sm:grid grid-cols-2 ${
            totalCount === 0 && " sm:hidden"
          }`}
        >
          <span>Cart items</span>
          <div className="grid grid-cols-3">
            <span className="text-center">Price</span>
            <span className="text-center">Quantity</span>
            <span className="text-center">Total</span>
          </div>
        </div>
        {totalCount === 0 && (
          <>
            <p>Your cart is empty :(</p>
            <Link href={{ pathname: "/products" }}>
              <Button color="primary" className="mt-5">
                Continue shopping
              </Button>
            </Link>
          </>
        )}
        <Divider className="my-3" />

        {cartItems.map(({ Product, Quantity, id }) => {
          return (
            <div key={Product.id}>
              <ProductCard
                id={id}
                userId={userId}
                product={Product}
                quantity={Quantity}
              />
              <Divider className="my-3" />
            </div>
          );
        })}
        <div className="bg-default sticky bottom-0 rounded-md py-1">
          <div className="flex justify-center items-center gap-5">
            <div>
              <span className="text-xl">Subtotal: </span>
              <span className="text-xs">{currencySymbol}</span>
              <span className="font-bold">{totalPrice}</span>
            </div>
            <span>({totalCount} items)</span>
            <Button
              as={Link}
              href={"/checkout"}
              isDisabled={totalCount === 0}
              color="primary"
              endContent={<IoIosArrowRoundForward />}
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
      {wishlistItems.length > 0 && (
        <>
          <h1 className="font-semi-bold text-xl mt-10">
            Items in your wishlist
          </h1>
          <ProductsCarousel
            addToCartButton
            userId={userId}
            data={wishlistItems.map((item) => item.Product)}
          />
        </>
      )}
    </div>
  );
}
export default page;
