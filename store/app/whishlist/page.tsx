import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductCard from "../components/ProductCard";
import { Divider } from "@nextui-org/react";
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
      <div className="flex sm:flex-row flex-col-reverse justify-between gap-5">
        <div className=" w-full p-5 rounded-md">
          <h1 className="text-2xl tracking-wider">Your whishlist</h1>
          <hr className="my-5" />
          {wishlistItems.length == 0 && (
            <div>
              Your Whishlist is empty:( <br />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {wishlistItems.map((product) => {
              return (
                <div key={product.id}>
                  <ProductCard
                    userId={userId}
                    addToCartButton
                    removeFromWishlistButton
                    product={product.Product}
                  />
                  <Divider className="my-3" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default page;
