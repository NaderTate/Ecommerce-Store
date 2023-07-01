import React from "react";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/users";
import { getProductById } from "@/lib/products";
import { Product } from "@prisma/client";
import CartPageRecommendedProductCard from "../components/CartPageRecommendedProductCard";
import Slider from "../components/Slider";
import { getProductByCategoryId } from "@/lib/products";
import WhishlistProductCard from "../components/WhishlistProductCard";
import { redirect } from "next/navigation";
async function page() {
  const { userId } = auth();
  const whishList: Array<string> = [];
  let whishListProducts: Array<Product> = [];
  let user: any;
  if (userId) {
    user = (await getUserById(userId)).user;
    user?.WhishList.map(({ id }: { id: string }) => {
      whishList.push(id);
    });
    whishListProducts = (await getProductById(whishList)).product || [];
  } else redirect("/sign-in?redirectURL=checkout");
  const womenFashiopProducts = (
    await getProductByCategoryId("648337b7223afa484880f4fb", 8)
  ).products;
  const ElectronicsProducts = (
    await getProductByCategoryId("64834120235cccf7aa5d6cc6", 15)
  ).products;
  const HomeAppliances = (
    await getProductByCategoryId("648349be3d5e7e6f8b55811f", 15)
  ).products;

  return (
    <div className="p-5">
      <div className="flex sm:flex-row flex-col-reverse justify-between gap-5">
        <div className="bg-white dark:bg-black/50 w-full p-5 rounded-md">
          <h1 className="text-2xl tracking-wider">Your whishlist</h1>
          <hr className="my-5" />
          {whishListProducts.length < 1 && (
            <div>
              Your Whishlist is empty:( <br />
            </div>
          )}
          <div className="space-y-5">
            {userId &&
              whishListProducts?.map((product) => {
                return (
                  <div key={product.id}>
                    <WhishlistProductCard userId={userId} product={product} />
                    <hr />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-full sm:w-96 mr-5">
          <div className="bg-white dark:bg-black/50 w-full rounded-md p-5 hidden sm:block">
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
