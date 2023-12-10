import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/users";
import { getProductById } from "@/lib/products";
import { Product } from "@prisma/client";
import ProductCard from "./ProductCard";
import CartPageRecommendedProductCard from "../components/CartPageRecommendedProductCard";
import ProductsCarousel from "../components/ProductsCarousel";
import Link from "next/link";
import { getProductByCategoryId } from "@/lib/products";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCartItems } from "../server_actions/cart";
import { getWishlistItems } from "../server_actions/wishlist";
import { currencySymbol } from "../global_variables";
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
      <div className="flex sm:flex-row flex-col-reverse justify-between gap-5">
        <div className="bg-white dark:bg-black/50 w-full p-5 rounded-md">
          <h1 className="text-2xl tracking-wider">Shopping Cart</h1>
          <hr className="my-5" />
          <div className="space-y-5">
            {cartItems.map(({ Product, Quantity, id }) => {
              return (
                <div key={Product.id}>
                  <ProductCard
                    id={id}
                    userId={userId}
                    product={Product}
                    quantity={Quantity}
                  />
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full sm:w-96 mr-5">
          <div className="bg-white dark:bg-black/50 w-full rounded-md text-xl tracking-wider p-5">
            Subtotal ({totalCount}) items: <br /> {currencySymbol}
            <span className="font-bold">{totalPrice}</span> <br />{" "}
            <Link href={{ pathname: "/checkout" }}>
              <button className=" bg-blue-700 rounded-md py-1 text-sm w-full text-white">
                Proceed to checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
      <ProductsCarousel
        cartPage
        userId={userId || ""}
        data={wishlistItems.map((item) => item.Product) || []}
      />
    </div>
  );
}
export default page;
