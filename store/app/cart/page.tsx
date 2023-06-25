import React from "react";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/users";
import { getProductById } from "@/lib/products";
import { Product } from "@prisma/client";
import CartProductCard from "../components/CartProductCard";
import { prisma } from "@/lib/prisma";
import CartPageRecommendedProductCard from "../components/CartPageRecommendedProductCard";
import Slider from "../components/Slider";
import Link from "next/link";
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
  }
  const womenFashiopProducts = await prisma.product.findMany({
    where: { Categories: { hasSome: "Women's Fashion" } },
    take: 4,
  });
  const ElectronicsProducts = await prisma.product.findMany({
    where: { Categories: { hasSome: "Electronics" } },
    take: 15,
  });
  const HomeAppliances = await prisma.product.findMany({
    where: { Categories: { hasSome: "Home Appliances" } },
    take: 15,
  });

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
            <span className="font-bold">{subtotal}</span> <br />
            <button className=" bg-blue-700 rounded-md py-1 text-sm w-full text-white">
              <Link href={{ pathname: "/checkout" }}>Proceed to buy</Link>
            </button>
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
      <Slider
        cartPage
        userId={userId || ""}
        title="Your Whish List"
        data={whishListProducts}
      />
      <Slider
        cartPage
        userId={userId || ""}
        title="Frequently repurchased in Health and beauty"
        data={ElectronicsProducts}
      />
      <Slider
        cartPage
        userId={userId || ""}
        title="Frequently repurchased in Home appliances"
        data={HomeAppliances}
      />
    </div>
  );
}
export default page;
