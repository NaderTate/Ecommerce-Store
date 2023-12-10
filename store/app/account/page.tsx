import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Main from "./Main";
export const metadata = {
  metadataBase: new URL("https://naderexpress.vercel.app/"),
  title: "My account",
  description: "manage your account",
  openGraph: {
    title: "My account",
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
    title: "My account",
    description: "manage your account",
  },
};
async function page() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in?redirectURL=account");
  const userAddresses = await prisma.address.findMany({
    where: { UserId: userId },
    orderBy: { id: "desc" },
  });
  const paymentCards = await prisma.card.findMany({
    where: { UserId: userId },
    orderBy: { id: "desc" },
  });

  return (
    <div className="px-5 sm:px-10 mt-20">
      <Main userId={userId} addresses={userAddresses} cards={paymentCards} />
    </div>
  );
}

export default page;
