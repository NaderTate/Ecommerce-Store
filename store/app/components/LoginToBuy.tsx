"use client";
import React, { useState } from "react";
import { SignInButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import ShareIcons from "./ShareIcons";
import { BiShare } from "react-icons/bi";
import { BsFillHeartbreakFill } from "react-icons/bs";
function BuyOptions({ mainImg, title }: { mainImg: string; title: string }) {
  const [showShare, setShowShare] = useState(false);
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
      <div className="flex gap-5 mt-5 justify-center sm:justify-start">
        <div
          onClick={() => {
            setShowShare(!showShare);
          }}
          className="flex gap-3 w-24 rounded-md dark:bg-gray-200/70 bg-black/50 text-white dark:text-black font-bold h-10 items-center justify-center cursor-pointer"
        >
          <BiShare size={30} />
          Share
        </div>
        <SignInButton redirectUrl={pathname} mode="modal">
          <div className="w-24 rounded-md dark:bg-gray-200/70 bg-black/50 text-black font-bold h-10 items-center flex  justify-center cursor-pointer">
            <BsFillHeartbreakFill size={30} fill="white" />
          </div>
        </SignInButton>
      </div>
      {showShare && <ShareIcons title={title} mainImg={mainImg} />}
    </div>
  );
}

export default BuyOptions;
