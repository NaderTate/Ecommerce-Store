import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import {
  UserCircleIcon,
  MapPinIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import UserDetailsForm from "../components/UserDetailsForm";
import { auth } from "@clerk/nextjs";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AddressForm from "../components/AddressForm";
import { Prisma } from "@prisma/client";
async function page({ searchParams }: any) {
  const { userId } = auth();
  let userData;
  let address_;
  if (userId) {
    userData = await prisma.user.findFirst({ where: { UserId: userId } });
  }
  if (
    userData?.Address &&
    typeof userData?.Address === "object" &&
    Array.isArray(userData?.Address)
  ) {
    const address = userData?.Address as Prisma.JsonArray;
    address_ = address[0];
  }
  const content = searchParams.content || "details";
  const linkStyle = "flex gap-2 my-4 cursor-pointer";
  return (
    <div className="p-10">
      <div className="font-bold text-4xl traching-widest my-5">My Account</div>
      <div className="flex">
        <div className="w-64 hidden md:block">
          <div>
            <Link
              className=""
              href={{ pathname: "/account", query: { content: "details" } }}
            >
              <div className={linkStyle}>
                <UserCircleIcon className="w-6" />
                My Details
              </div>
            </Link>
          </div>
          <Link href={{ pathname: "/account", query: { content: "address" } }}>
            <div className={linkStyle}>
              <MapPinIcon className="w-6" />
              My Address
            </div>
          </Link>
          <Link href={{ pathname: "/account", query: { content: "orders" } }}>
            <div className={linkStyle}>
              <ShoppingBagIcon className="w-6" />
              My Orders
            </div>
          </Link>
          <Link href={{ pathname: "/account", query: { content: "settings" } }}>
            <div className={linkStyle}>
              <Cog6ToothIcon className="w-6" />
              Account Settings
            </div>
          </Link>
          <SignOutButton>
            <div className={linkStyle}>
              <ArrowRightOnRectangleIcon className="w-6" />
              Logout
            </div>
          </SignOutButton>
        </div>
        <div className="w-full md:pr-24">
          {content == "details" && userData && (
            <UserDetailsForm userData={userData} />
          )}
          {content == "address" && userData && (
            <AddressForm address={address_} userId={userData.UserId} />
          )}
          {content == "orders" && userData && (
            <UserDetailsForm userData={userData} />
          )}
          {content == "settings" && userData && (
            <UserDetailsForm userData={userData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
