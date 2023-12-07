import React from "react";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/users";
import { getProductById } from "@/lib/products";
import { Product } from "@prisma/client";
import CartProductCard from "../components/CartProductCard";
import CartPageRecommendedProductCard from "../components/CartPageRecommendedProductCard";
import ProductsCarousel from "../components/ProductsCarousel";
import Link from "next/link";
import { getProductByCategoryId } from "@/lib/products";
import { redirect } from "next/navigation";
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
  let cartProducts: Array<Product>;
  let sortedCart: Array<{ product: any; quantity: number }> = [];
  const whishList: Array<string> = [];
  let whishListProducts: Array<Product> = [];
  const cart: Array<string> = [];
  let user: any;
  let subtotal_: number = 0;
  let subtotal: number = 0;
  let totalQuantity: number = 0;
  if (userId) {
    user = (await getUserById(userId)).user;
    user?.Cart.map(({ id }: { id: string }) => {
      cart.push(id);
    });
    cartProducts = (await getProductById(cart)).product || [];
    cart.map((ID) => {
      sortedCart.push({
        product: cartProducts.find(({ id }: { id: string }) => id == ID),
        quantity: user?.Cart.find(({ id }: { id: string }) => id == ID)
          .quantity,
      });
    });
    sortedCart.reverse();
    sortedCart.map(
      ({ product, quantity }: { product: Product; quantity: number }) => {
        subtotal_ = subtotal_ + product.Price * quantity;
        totalQuantity = totalQuantity + quantity;
      }
    );
    subtotal = Math.round(subtotal_ * 10) / 10;
    user?.WhishList.map(({ id }: { id: string }) => {
      whishList.push(id);
    });
    whishListProducts = (await getProductById(whishList)).product || [];
  } else redirect("/sign-in?redirectURL=cart");
  const womenFashiopProducts = (
    await getProductByCategoryId("648337b7223afa484880f4fb", 4)
  ).products;
  const ElectronicsProducts = (
    await getProductByCategoryId("64834120235cccf7aa5d6cc6", 4)
  ).products;
  const HomeAppliances = (
    await getProductByCategoryId("648349be3d5e7e6f8b55811f", 4)
  ).products;

  return (
    <div className="p-5">
      <div className="flex sm:flex-row flex-col-reverse justify-between gap-5">
        <div className="bg-white dark:bg-black/50 w-full p-5 rounded-md">
          <h1 className="text-2xl tracking-wider">Shopping Cart</h1>
          <hr className="my-5" />
          <div className="space-y-5">
            {userId &&
              sortedCart?.map((product) => {
                return (
                  <div key={product.product.id}>
                    <CartProductCard
                      userId={userId}
                      product={product.product}
                      quantity={product.quantity}
                    />
                    <hr />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-full sm:w-96 mr-5">
          <div className="bg-white dark:bg-black/50 w-full rounded-md text-xl tracking-wider p-5">
            Subtotal ({totalQuantity}) items: <br /> $
            <span className="font-bold">{subtotal}</span> <br />{" "}
            <Link href={{ pathname: "/checkout" }}>
              <button className=" bg-blue-700 rounded-md py-1 text-sm w-full text-white">
                Proceed to checkout
              </button>
            </Link>
          </div>
          <div className="bg-white dark:bg-black/50 w-full rounded-md p-5 mt-5 hidden sm:block">
            <h1 className="font-bold text-lg tracking-wide mb-5">
              Frequently repurchased in personal care and home
            </h1>
            <div className="space-y-5">
              {userId &&
                womenFashiopProducts?.map((product) => {
                  return (
                    <CartPageRecommendedProductCard
                      userId={userId}
                      key={product.id}
                      product={product}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <ProductsCarousel
        cartPage
        userId={userId || ""}
        title="Your Whish List"
        data={whishListProducts}
      />
      <ProductsCarousel
        cartPage
        userId={userId || ""}
        title="Frequently repurchased in Health and beauty"
        data={ElectronicsProducts}
      />
      <ProductsCarousel
        cartPage
        userId={userId || ""}
        title="Frequently repurchased in Home appliances"
        data={HomeAppliances}
      />
    </div>
  );
}
export default page;
