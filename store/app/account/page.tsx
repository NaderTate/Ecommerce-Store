import { SignOutButton } from "@clerk/nextjs";
import { PaymentMethod } from "../components/PaymentMethod";
import { BiUserCircle } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineCreditCard } from "react-icons/ai";
import { SlLogout } from "react-icons/sl";
import UserDetailsForm from "../components/UserDetailsForm";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AddressForm from "../components/AddressForm";
import Orders from "../components/Orders";
import { redirect } from "next/navigation";
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
async function page({ searchParams }: any) {
  const { userId } = auth();
  let userData;
  let address_;
  if (userId) {
    userData = await prisma.user.findUnique({
      where: { UserId: userId },
      include: { Orders: { orderBy: { id: "desc" } }, Address: true },
    });
  } else redirect("/sign-in?redirectURL=account");
  if (
    userData?.Address &&
    typeof userData?.Address === "object" &&
    Array.isArray(userData?.Address)
  ) {
    const address = userData?.Address;
    address_ = address[0];
  }
  const content = searchParams.content || "details";
  const linkStyle = "flex gap-2 my-4 cursor-pointer items-center";
  const navItems = [
    {
      icon: <BiUserCircle size={25} />,
      text: "My Details",
      link: "/account",
      query: { content: "details" },
    },
    {
      icon: <IoLocationOutline size={25} />,
      text: "My Address",
      link: "/account",
      query: { content: "address" },
    },
    {
      icon: <BsHandbag size={25} />,
      text: "My Orders",
      link: "/account",
      query: { content: "orders" },
    },
    {
      icon: <AiOutlineCreditCard size={25} />,
      text: "Payment methods",
      link: "/account",
      query: { content: "payment" },
    },
  ] as Array<{ icon: JSX.Element; text: string; link: string; query: {} }>;
  return (
    <div className="sm:p-10">
      <div className="">
        <div className="w-72 fixed bg-white dark:bg-inherit h-full px-5  rounded-md">
          <div className="font-bold text-4xl traching-widest my-5 hidden md:block">
            My Account
          </div>
          <div className="hidden md:block">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={{ pathname: item.link, query: item.query }}
              >
                <div className={linkStyle}>
                  {item.icon}
                  {item.text}
                </div>
              </Link>
            ))}
            <SignOutButton>
              <div className={linkStyle}>
                <SlLogout size={25} />
                Logout
              </div>
            </SignOutButton>
          </div>
        </div>
        <div className="md:ml-80 mt-5 p-5">
          {content == "details" && userData && (
            <UserDetailsForm userData={userData} />
          )}
          {content == "address" && userData && (
            <AddressForm address={address_} userId={userData.UserId} />
          )}
          {content == "settings" && userData && (
            <UserDetailsForm userData={userData} />
          )}

          {content == "payment" && <PaymentMethod />}
          {content == "orders" && userData && (
            <Orders orders={userData?.Orders} />
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
