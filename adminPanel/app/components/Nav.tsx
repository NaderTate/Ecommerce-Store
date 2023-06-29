"use client";
import React from "react";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import MobileMenu from "./MobileMenu";
import { GrUserAdmin } from "react-icons/gr";
import { FaChartLine } from "react-icons/fa";
import { BsBoxes } from "react-icons/bs";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { BiCategoryAlt } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
function Nav({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [path, setPath] = useState("");
  useEffect(() => {
    //  url = pathname + searchParams.toString();
    // the above line get the url with the query
    setPath(pathname);
  }, [pathname, searchParams]);
  const menuItems = [
    {
      label: "Dashboard",
      url: "/dashboard",
      icon: <FaChartLine />,
    },
    {
      label: "Products",
      url: "/products",
      icon: <BsBoxes />,
    },
    {
      label: "Categories",
      url: "/categories",

      icon: <BiCategoryAlt />,
    },
    {
      label: "Orders",
      url: "/orders",
      icon: <PiCurrencyDollarBold />,
    },
    {
      label: "Admins",
      url: "/admins",

      icon: <GrUserAdmin />,
    },
    {
      label: "Settings",
      url: "/settings",
      icon: <FiSettings />,
    },
  ];
  return (
    <div className="">
      <div className=" h-screen flex-col justify-between border-e  w-[200px] fixed left-0 top-0 hidden sm:flex">
        <div className="p-4">
          <img
            className="w-16 "
            src="https://res.cloudinary.com/dqkyatgoy/image/upload/v1685277800/Nader%20Express/logo_wjbyiz.svg"
            alt=""
          />

          <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
            {menuItems.map(
              ({
                label,
                icon,
                url,
              }: {
                label: string;
                icon: any;
                url: any;
              }) => {
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
          </nav>
        </div>
        <div className="group relative">
          <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 ">
            <div className="group-hover:opacity-0 transition duration-300 flex items-center gap-2  p-4 ">
              <img
                loading="lazy"
                alt="User"
                src={image}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <div className="text-xs">
                  <strong className="block font-medium max-w-[120px] overflow-ellipsis whitespace-nowrap overflow-hidden">
                    {name}
                  </strong>
                  <p className="max-w-[120px] overflow-ellipsis whitespace-nowrap overflow-hidden">
                    {" "}
                    {email}{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-around w-full opacity-0 group-hover:opacity-100 absolute top-6">
              {/* @ts-ignore*/}
              <Link href="/profile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="blue"
                  className="w-8 h-8 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
              <svg
                onClick={() => {
                  signOut();
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="red"
                className="w-8 h-8 cursor-pointer"
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
      <div className="sm:hidden ">
        <MobileMenu
          name={name}
          email={email}
          image={image}
          menuItems={menuItems}
        />
      </div>
    </div>
  );
}

export default Nav;
