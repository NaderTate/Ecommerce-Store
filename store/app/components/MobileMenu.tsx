"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import ThemeButton from "./ThemeButton";
import { MagnifyingGlassIcon, HomeModernIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");
  const router = useRouter();

  const itemStyle =
    "p-2 w-full dark:bg-[#3B3B3B] bg-white flex flex-col items-center rounded-md font-bold tracking-widest";

  return (
    <div className="">
      <div
        className={`menuBtn  ${isMenuOpen ? "closer" : null}`}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <div
          className={`btnLine bg-black dark:bg-white ${
            isMenuOpen ? "closer" : null
          }`}
        />
        <div
          className={`btnLine bg-black dark:bg-white ${
            isMenuOpen ? "closer" : null
          }`}
        />
        <div
          className={`btnLine bg-black dark:bg-white ${
            isMenuOpen ? "closer" : null
          }`}
        />
      </div>
      <nav
        aria-label="Main Nav"
        className={`pt-16 mt-1 rounded-md border border-b border-white bg-[#efefef] menuOverlay dark:bg-[#121212] ${
          isMenuOpen ? "show" : null
        } `}
      >
        <div className="px-1 flex flex-col justify-center items-center space-y-2 ">
          <div className="relative">
            <form action="">
              <input
                type="text"
                placeholder="Search anything..."
                className="rounded-md py-1 px-3 dark:border-none border border-gray-400"
                onChange={(e) => {
                  setSearchTerms(e.target.value);
                }}
                // onChange={Search}
                // onClick={() => {
                //   setShow(true);
                // }}
              />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (searchTerms.length > 2) {
                    router.push(`/search?s=${searchTerms}`);
                  }
                }}
                // onClick={handleSubmit}
              ></button>
            </form>
            <span className="absolute inset-y-0 inline-flex items-center right-4">
              <MagnifyingGlassIcon className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
          <div className={itemStyle}>
            <div className="flex gap-1">
              <h1>Home</h1>
              <HomeModernIcon />
            </div>
          </div>
          <div className={itemStyle}>
            <h1>Trending </h1>

            <a href="/" className=" font-normal ">
              Women&apos;s Fashion
            </a>
          </div>
          <div className={itemStyle}>
            <h1>Hot Deals</h1>
            <a href="/" className=" font-normal ">
              Fitness Equimpents
            </a>
            <a href="/" className=" font-normal ">
              Pearl Jewelery
            </a>
          </div>
          <div> </div>
          <ThemeButton />
        </div>
      </nav>
    </div>
  );
}

export default MobileMenu;
