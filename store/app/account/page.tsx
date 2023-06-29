import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import {
  UserCircleIcon,
  MapPinIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import UserDetailsForm from "../components/UserDetailsForm";
import { auth } from "@clerk/nextjs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AddressForm from "../components/AddressForm";
import { Prisma } from "@prisma/client";
import CreditCardForm from "../components/CreditCardForm";
import PaypalForm from "../components/PaypalForm";
import Orders from "../components/Orders";
async function page({ searchParams }: any) {
  const { userId } = auth();
  let userData;
  let address_;
  if (userId) {
    userData = await prisma.user.findUnique({
      where: { UserId: userId },
      include: { Orders: true, Address: true },
    });
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
      <div className="flex gap-10">
        <div className="w-72 hidden md:block bg-white dark:bg-inherit px-5 rounded-md">
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
          <Accordion type="single" collapsible className="w-fulls p-0">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex gap-2">
                  <CreditCardIcon className="w-6" />
                  Payment methods
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-8">
                <Link
                  href={{ pathname: "/account", query: { content: "credit" } }}
                >
                  Credit/debit cards
                </Link>
              </AccordionContent>
              <AccordionContent className="ml-8">
                <Link
                  href={{ pathname: "/account", query: { content: "paypal" } }}
                >
                  Paypal
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
          {content == "settings" && userData && (
            <UserDetailsForm userData={userData} />
          )}
          {content == "credit" && userData && (
            <div>
              <details className="group [&_summary::-webkit-details-marker]:hidden ">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white bg-[#1d4ed8] w-24">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">New</span>
                  </div>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <nav aria-label="Teams Nav" className="mt-2 ">
                  <CreditCardForm />
                </nav>
              </details>
            </div>
          )}
          {content == "paypal" && userData && (
            <div>
              <details className="group [&_summary::-webkit-details-marker]:hidden ">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white bg-[#1d4ed8] w-24">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">New</span>
                  </div>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <nav aria-label="Teams Nav" className="mt-2 ">
                  <PaypalForm />
                </nav>
              </details>
            </div>
          )}
          {content == "orders" && userData && (
            <Orders orders={userData?.Orders} />
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
