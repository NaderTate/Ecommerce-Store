"use client";
import React from "react";
import { SignInButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
function BuyOptions() {
  const pathname = usePathname();
  const buttonStyle =
    "w-full sm:w-56 h-12 rounded-md cursor-pointer font-bold text-white ";
  return (
    <div>
      <div className="sm:flex-row flex flex-col gap-5 sm:gap-10">
        <SignInButton redirectUrl={pathname} mode="modal">
          <button className={buttonStyle + " bg-blue-700"}>Add to cart</button>
        </SignInButton>
        <SignInButton redirectUrl={pathname} mode="modal">
          <button className={buttonStyle + " bg-blue-950"}>Buy now</button>
        </SignInButton>
      </div>
    </div>
  );
}

export default BuyOptions;
