"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeSwitcher from "../ThemeSwitcher";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { menuItems } from "./menuItems";
function Sidebar({
  name,
  email,
  image,
}: {
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}) {
  const pathname = usePathname();

  const [showSideBar, setShowSideBar] = useState(false);
  const handleClickOutside = (event: MouseEvent) => {
    if ((event.target as Element).closest("#sidebar") === null) {
      setShowSideBar(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
  return (
    <>
      <Button
        variant="light"
        className="sm:hidden fixed left-3 top-3 cursor-pointer z-50"
        onPress={() => setShowSideBar(!showSideBar)}
        isIconOnly
      >
        {showSideBar ? <RxCross2 size={20} /> : <HiOutlineMenuAlt4 size={20} />}
      </Button>

      <div className="h-full fixed z-30" id="sidebar">
        <div
          className={`overflow-y-scroll no-scrollbar h-screen justify-between border-e-2 border-divider w-44 fixed left-0 top-0 bg-background sm:opacity-100 sm:translate-x-0 transition-all ${
            showSideBar
              ? " opacity-100 translate-x-0"
              : " -translate-x-[100vw] opacity-0"
          }`}
        >
          <div className="p-4">
            <Image
              className="hidden sm:block"
              width={65}
              height={65}
              src="https://res.cloudinary.com/dqkyatgoy/image/upload/v1685277800/Nader%20Express/logo_wjbyiz.svg"
              alt="Nader Express"
            />

            <nav
              aria-label="Main Nav"
              className="mt-10 sm:mt-6 flex flex-col gap-1"
            >
              {menuItems.map(({ label, icon, url }) => {
                return (
                  <Button
                    onPress={() => setShowSideBar(false)}
                    as={Link}
                    href={url}
                    key={label}
                    startContent={icon}
                    className="justify-start"
                    color={
                      pathname.includes(label.toLocaleLowerCase())
                        ? "primary"
                        : "default"
                    }
                  >
                    {label}
                  </Button>
                );
              })}
              <Button
                onPress={() => signOut()}
                color="danger"
                className="justify-start"
                startContent={<RiLogoutCircleLine />}
              >
                Sign out
              </Button>
              <ThemeSwitcher />
            </nav>
          </div>
          <div className="flex items-center gap-2 border-t-2 border-divider p-4 absolute bottom-0">
            <img
              loading="lazy"
              alt="User"
              src={image || ""}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="text-xs">
              <strong className="block font-medium line-clamp-1">{name}</strong>
              <p className="line-clamp-1 max-w-[100px] text-default-500">
                {email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
