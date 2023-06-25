import "./globals.css";
import "./styles.scss";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });
import Providers from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { getUserById } from "@/lib/users";
import { auth } from "@clerk/nextjs";
import { getProductById, getProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import { Product } from "@prisma/client";
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
  const newArrivals = (await getProducts(1, 12)).products;
  const Discover = (await getCategories(1, 12)).categories;
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <div className="min-h-screen flex flex-col">
              <Header
                userImage={
                  user?.Image ||
                  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687453046/Nader%20Express/Frame_1_a507eb.svg"
                }
                newArrivals={newArrivals || []}
                Discover={Discover || []}
                cart={sortedCart.reverse() || []}
                Whishlist={whishListProducts || []}
                // cart={cartProducts?.slice(0, 12) || []}
              />
              <div className="grow mt-7 md:mt-0 w-screen overflow-hidden">
                {children}
              </div>
              <Footer />
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
