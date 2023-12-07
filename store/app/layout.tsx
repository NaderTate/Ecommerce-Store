import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });
import { ClerkProvider } from "@clerk/nextjs";
import { getUserById } from "@/lib/users";
import { auth } from "@clerk/nextjs";
import { getProductById } from "@/lib/products";
import { Product } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import ClientProviders from "./components/ClientProviders";
export const metadata = {
  metadataBase: new URL("https://naderexpress.vercel.app/"),
  title: { default: "Nader Express", template: "%s | Nader Express" },
  description: "We got this",
  openGraph: {
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
    title: "Nader Express",
    description: "We got this",
  },
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
    user?.Cart?.map((item: any) => {
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
    user?.WhishList?.map((item: any) => {
      whishList.push(item?.id);
    });
    whishListProducts = (await getProductById(whishList)).product || [];
  }
  const productCount = await prisma.product.count();
  const skip = Math.floor(Math.random() * productCount);
  const newArrivals = await prisma.product.findMany({
    take: 8,
    skip,
    orderBy: { createdAt: "desc" },
  });
  const categoriesCount = await prisma.category.count();
  const skipCategories = Math.floor(Math.random() * categoriesCount);
  const Discover = await prisma.category.findMany({
    take: 8,
    skip: skipCategories,
    orderBy: { createdAt: "desc" },
  });
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <ClerkProvider>
            <div className="min-h-screen flex flex-col">
              <Header
                newArrivals={newArrivals || []}
                Discover={Discover || []}
                cart={sortedCart.reverse() || []}
                Whishlist={whishListProducts || []}
              />
              <div className="grow ">{children}</div>
              <Footer />
            </div>
          </ClerkProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
