"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import ThemeSwitcher from "./ThemeSwitcher";
import Image from "next/image";
function MobileMenu({
  menuItems,
  name,
  email,
  image,
}: {
  menuItems: any;
  name: string;
  email: string;
  image: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [path, setPath] = useState("");
  useEffect(() => {
    setPath(pathname);
  }, [pathname, searchParams]);
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
        className={`pt-16 mt-1 rounded-md border border-b border-white menuOverlay dark:bg-[#121212] ${
          isMenuOpen ? "show" : null
        } `}
      >
        <div className="px-5 flex flex-col space-y-1 ">
          {menuItems.map(
            ({ label, icon, url }: { label: string; icon: any; url: any }) => {
              return (
                <Link
                  key={label}
                  href={url}
                  className={`${
                    path.includes(label.toLocaleLowerCase())
                      ? "bg-blue-700 text-white"
                      : "text-gray-700 bg-gray-100"
                  } flex items-center gap-2 rounded-lg  px-4 py-2`}
                >
                  {icon}
                  <span className="text-sm font-medium"> {label} </span>
                </Link>
              );
            }
          )}
          <ThemeSwitcher />
        </div>
        <div className=" absolute bottom-0 w-full">
          <div className="w-full border-t border-gray-100 ">
            <div className=" flex items-center gap-x-2  p-4 ">
              {/* @ts-ignore*/}
              <Link href={"/profile"} className=" flex items-center gap-x-2  ">
                <Image
                  loading="lazy"
                  alt={name}
                  width={40}
                  height={40}
                  src={image}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-xs">
                    <strong className="block font-medium">{name}</strong>
                    <span> {email} </span>
                  </p>
                </div>
              </Link>
              <div className="w-full flex justify-end">
                <svg
                  onClick={() => {
                    signOut();
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  className="w-8 h-8   mr-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default MobileMenu;
