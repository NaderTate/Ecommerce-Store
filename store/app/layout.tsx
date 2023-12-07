import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import ClientProviders from "./components/ClientProviders";
import { getCartItems } from "./server_actions/cart";
import { getWishlistItems } from "./server_actions/wishlist";
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
  const cart = userId ? await getCartItems(userId, 7) : null;
  const wishlist = userId ? await getWishlistItems(userId, 7) : null;
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <ClerkProvider>
            <div className="min-h-screen flex flex-col">
              <Header cart={cart} Whishlist={wishlist} />
              <div className="grow ">{children}</div>
              <Footer />
            </div>
          </ClerkProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
