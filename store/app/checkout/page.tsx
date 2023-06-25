import React from "react";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/users";
import { prisma } from "@/lib/prisma";
import { getProductById } from "@/lib/products";
import { Product } from "@prisma/client";
import Link from "next/link";
import CheckoutForm from "../components/CheckoutForm";

async function page() {
  const { userId } = auth();
  let cartProducts: Array<Product>;
  let sortedCart: Array<{ product: any; quantity: number }> = [];
  const cart: Array<string> = [];
  let user: any;
  let subtotal_: number = 0;
  let subtotal: number = 0;
  let totalQuantity: number = 0;
  let address;
  if (userId) {
    user = (await getUserById(userId)).user;
    user?.Cart.map(({ id }: { id: string }) => {
      cart.push(id);
    });
    address = user?.Address;
    cartProducts = (await getProductById(cart)).product || [];
    cart.map((ID) => {
      sortedCart.push({
        product: cartProducts.find(({ id }: { id: string }) => id == ID),
        quantity: user?.Cart.find(({ id }: { id: string }) => id == ID)
          .quantity,
      });
    });
    sortedCart.map(
      ({ product, quantity }: { product: Product; quantity: number }) => {
        subtotal_ = subtotal_ + product.Price * quantity;
        totalQuantity = totalQuantity + quantity;
      }
    );
    subtotal = Math.round(subtotal_ * 10) / 10;
  }
  return (
    <div className="sm:px-12 px-5">
      <div>
        <h1 className="text-2xl my-12 text-center tracking-wider">
          Checkout ({totalQuantity} items)
        </h1>
        {userId && (
          <CheckoutForm
            cartItems={user.Cart}
            userId={userId}
            subtotal={subtotal}
            address={address}
          />
        )}
      </div>
    </div>
  );
}

export default page;
