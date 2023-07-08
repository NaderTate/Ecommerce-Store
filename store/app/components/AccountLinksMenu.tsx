"use client";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineCreditCard } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { BsHandbag } from "react-icons/bs";
import { IoCloseOutline as XMarkIcon } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
export const menuItems = [
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
function AccountLinksMenu({ userImage }: { userImage: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const itemStyle =
    "p-2 w-full dark:bg-[#3B3B3B] bg-white flex items-center rounded-md font-bold tracking-widest  gap-2 my-2";
  return (
    <div>
      <Image
        width={20}
        height={20}
        onClick={() => {
          setIsMenuOpen(true);
        }}
        src={userImage}
        className="menuBtn2 w-7 rounded-full"
        alt=""
      />
      <nav
        aria-label="Main Nav"
        className={` mt-1 rounded-md border border-b border-white bg-[#efefef] menuOverlay2 dark:bg-[#121212] ${
          isMenuOpen ? "show" : null
        } `}
      >
        <XMarkIcon
          size={25}
          className="cursor-pointer"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        />

        <div className="mt-2 px-1 flex flex-col justify-center items-center space-y-2 w-full">
          <div className="w-full">
            {menuItems.map((item, index) => (
              <Link
                onClick={() => setIsMenuOpen(false)}
                key={index}
                href={{ pathname: item.link, query: item.query }}
              >
                <div className={itemStyle}>
                  {item.icon}
                  {item.text}
                </div>
              </Link>
            ))}
            <SignOutButton>
              <div className={itemStyle}>
                <SlLogout className="w-6" />
                Logout
              </div>
            </SignOutButton>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default AccountLinksMenu;
