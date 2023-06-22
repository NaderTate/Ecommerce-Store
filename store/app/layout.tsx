import "./globals.css";
import "./styles.scss";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });
import Providers from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { getUserById } from "@/lib/users";
import { auth } from "@clerk/nextjs";
import { getProductById, getProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import { Product } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  let count;
  let cartProducts: Array<Product>;
  let sortedCart: Array<any> = [];
  const whishList: Array<string> = [];
  let whishListProducts: Array<Product> = [];
  let uniqueCart: Array<string> = [];
  const cart: Array<string> = [];
  if (userId) {
    const { user } = await getUserById(userId);
    count = user?.Cart.length;
    user?.Cart.map((item: any) => {
      cart.push(item?.id);
    });
    cart.forEach((element) => {
      if (!uniqueCart.includes(element)) {
        uniqueCart.push(element);
      }
    });

    cartProducts = (await getProductById(cart)).product || [];
    uniqueCart.map((ID) => {
      sortedCart.push(cartProducts.find(({ id }: { id: string }) => id == ID));
    });
    // console.log(cartProducts);
    // cartProducts?.slice(-3);
    // console.log(cartProducts);
    user?.WhishList.map((item: any) => {
      whishList.push(item?.id);
    });
    whishListProducts = (await getProductById(whishList)).product || [];
  }
  const newArrivals = (await getProducts(1, 12)).products;
  const Discover = (await getCategories(1, 12)).categories;
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <div className="min-h-screen flex flex-col">
              <Header
                newArrivals={newArrivals || []}
                Discover={Discover || []}
                cart={sortedCart.reverse() || []}
                Whishlist={whishListProducts || []}
                // cart={cartProducts?.slice(0, 12) || []}
                count={count || 0}
              />
              <div className="grow mt-7 md:mt-0">{children}</div>
              <Footer />
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
