import React from "react";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/users";
import { getProductById } from "@/lib/products";
import { Product } from "@prisma/client";
import CartProductCard from "../components/CartProductCard";
async function page() {
  const { userId } = auth();
  let cartProducts: Array<Product>;
  let sortedCart: Array<any> = [];
  const whishList: Array<string> = [];
  let whishListProducts: Array<Product> = [];
  const cart: Array<string> = [];
  let user: any;
  if (userId) {
    user = (await getUserById(userId)).user;
    user?.Cart.map((item: any) => {
      cart.push(item?.id);
    });
    cartProducts = (await getProductById(cart)).product || [];
    cart.map((ID) => {
      sortedCart.push({
        product: cartProducts.find(({ id }: { id: string }) => id == ID),
        quantity: user?.Cart.find(({ id }: { id: string }) => id == ID)
          .quantity,
      });
    });
    user?.WhishList.map((item: any) => {
      whishList.push(item?.id);
    });
    whishListProducts = (await getProductById(whishList)).product || [];
  }

  return (
    <div className="p-5">
      <div className="flex justify-between gap-10">
        <div className="bg-white dark:bg-black/50 w-full p-5 rounded-md">
          <h1 className="text-2xl tracking-wider">Shopping Cart</h1>
          <hr className="my-5" />
          <div className="space-y-5">
            {userId &&
              sortedCart?.map((product) => {
                return (
                  <div key={product.id}>
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
        <div className="w-96">Side</div>
      </div>
    </div>
  );
}
export default page;
