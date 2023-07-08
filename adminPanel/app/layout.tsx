import "./globals.css";
import "./styles.scss";
import { Inter } from "next/font/google";
import Provider from "./components/Provider";
const inter = Inter({ subsets: ["latin"] });
import Providers from "./Providers";
export const metadata = {
  metadataBase: new URL("https://expressadmin.vercel.app/"),
  title: {
    default: "Nader Express admin panel",
    template: "%s | Nader Express",
  },
  description: "We got this",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://expressadmin.vercel.app/",
    siteName: "Nader Express admin panel",
    images: [
      {
        url: "https://res.cloudinary.com/dqkyatgoy/image/upload/v1628753046/Nader%20Express/Frame_1_a507eb.svg",
        width: 800,
        height: 600,
        alt: "Nader Express admin panel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@expressadmin",
    title: "Nader Express admin panel",
    description: "We got this",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Providers>
            {/* @ts-ignore */}
            <div className="">{children}</div>
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
