import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Divider } from "@nextui-org/react";

import ProductCard from "@/components/ProductCard";

import { prisma } from "@/lib/prisma";

export const metadata = {
  metadataBase: new URL("https://naderexpress.vercel.app/"),
  title: "Wishlist",
  description: "review your wishlist",
  openGraph: {
    title: "Wishlist",
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
    title: "Wishlist",
    description: "review your wishlist",
  },
};
async function page() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in?redirectURL=wishlist");
  const wishlistItems = await prisma.whishListItem.findMany({
    where: { UserId: userId },
    include: {
      Product: {
        select: {
          id: true,
          Title: true,
          Price: true,
          mainImg: true,
          secondImage: true,
        },
      },
    },
  });

  return (
    <div className="px-5 sm:px-10 mt-20">
      <h3 className="text-2xl tracking-wider">Your whishlist</h3>
      <Divider className="my-5" />
      {wishlistItems.length == 0 && (
        <h2>
          Your Whishlist is empty:( <br />
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {wishlistItems.map((product) => {
          return (
            <ProductCard
              key={product.id}
              userId={userId}
              addToCartButton
              removeFromWishlistButton
              product={product.Product}
            />
          );
        })}
      </div>
    </div>
  );
}
export default page;
