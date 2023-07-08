import React from "react";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { getProductById } from "@/lib/products";
import { Product } from "@prisma/client";
import CheckoutForm from "../components/CheckoutForm";
import { redirect } from "next/navigation";
export const metadata = {
  metadataBase: new URL("https://naderexpress.vercel.app/"),
  title: "Checkout",
  description: "review your order and checkout",
  openGraph: {
    title: "Checkout",
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
    title: "Checkout",
    description: "review your order and checkout",
  },
};
async function page({ searchParams }: { searchParams: any }) {
  const productId = searchParams.productId || null;
  let productPrice = 0;
  if (productId) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { Price: true },
    });
    productPrice = product?.Price || 0;
  }
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
    user = await prisma.user.findUnique({
      where: { UserId: userId },
      include: { Address: true },
    });
    user?.Cart.map(({ id }: { id: string }) => {
      cart.push(id);
    });
    address = user?.Address[0];
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
  } else redirect("/sign-in?redirectURL=checkout");
  return (
    <div className="sm:px-12 px-5">
      <div>
        <h1 className="text-2xl my-12 text-center tracking-wider">
          Checkout ({totalQuantity} items)
        </h1>
        {userId && (
          <CheckoutForm
            cartItems={productId ? [{ id: productId }] : user.Cart}
            userId={userId}
            subtotal={productId ? productPrice : subtotal}
            address={address}
          />
        )}
      </div>
    </div>
  );
}

export default page;
