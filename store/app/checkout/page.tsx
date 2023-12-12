import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import Main from "./Main";
import { redirect } from "next/navigation";
import { getCartItems } from "../server_actions/cart";
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

async function page() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in?redirectURL=checkout");
  const { cartItems, totalPrice, totalCount } = await getCartItems(userId);
  const userAddresses = await prisma.address.findMany({
    where: { UserId: userId },
    select: {
      id: true,
      City: true,
      Street: true,
      Building: true,
    },
    orderBy: { createdAt: "desc" },
  });
  const userPaymentCards = await prisma.card.findMany({
    where: { UserId: userId },
    select: {
      id: true,
      CardNumber: true,
      HolderName: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="sm:px-10 mt-20 px-5">
      <h1 className="text-2xl my-12 text-center tracking-wider">
        Checkout ({totalCount} items)
      </h1>
      {userId && (
        <Main
          cartItems={cartItems}
          userId={userId}
          subtotal={totalPrice}
          addresses={userAddresses}
          paymentCards={userPaymentCards}
        />
      )}
    </div>
  );
}

export default page;
