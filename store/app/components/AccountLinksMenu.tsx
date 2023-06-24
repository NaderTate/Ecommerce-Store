"use client";
import Link from "next/link";
import { useState } from "react";
import {
  UserCircleIcon,
  MapPinIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { SignOutButton } from "@clerk/nextjs";
function AccountLinksMenu({ userImage }: { userImage: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const itemStyle =
    "p-2 w-full dark:bg-[#3B3B3B] bg-white flex items-center rounded-md font-bold tracking-widest  gap-2";

  return (
    <div>
      <img
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
          className="w-6 cursor-pointer"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          close
        </XMarkIcon>
        <div className="mt-2 px-1 flex flex-col justify-center items-center space-y-2 w-full">
          <div className="w-full">
            <Link
              className="w-full"
              href={{ pathname: "/account", query: { content: "details" } }}
            >
              <div className={itemStyle}>
                <UserCircleIcon className="w-6" />
                My Details
              </div>
            </Link>
          </div>
          <Link
            className="w-full"
            href={{ pathname: "/account", query: { content: "address" } }}
          >
            <div className={itemStyle}>
              <MapPinIcon className="w-6" />
              My Address
            </div>
          </Link>
          <Link
            className="w-full"
            href={{ pathname: "/account", query: { content: "orders" } }}
          >
            <div className={itemStyle}>
              <ShoppingBagIcon className="w-6" />
              My Orders
            </div>
          </Link>
          <Link
            className="w-full"
            href={{ pathname: "/account", query: { content: "settings" } }}
          >
            <div className={itemStyle}>
              <Cog6ToothIcon className="w-6" />
              Account Settings
            </div>
          </Link>
          <SignOutButton>
            <div className={itemStyle}>
              <ArrowRightOnRectangleIcon className="w-6" />
              Logout
            </div>
          </SignOutButton>
        </div>
      </nav>
    </div>
  );
}

export default AccountLinksMenu;
