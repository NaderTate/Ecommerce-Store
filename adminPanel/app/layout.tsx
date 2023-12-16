import { getServerSession } from "next-auth";
import ClientProviders from "./components/ClientProviders";
import "./globals.css";
import { Inter } from "next/font/google";
import { authOptions } from "./api/auth/[...nextauth]/route";
const inter = Inter({ subsets: ["latin"] });

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
type Props = { children: React.ReactNode };
export default async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders session={session}>{children}</ClientProviders>
      </body>
    </html>
  );
}
