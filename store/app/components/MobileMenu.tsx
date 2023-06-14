"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
function MobileMenu() {
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
          {/* <ThemeSwitcher /> */}
        </div>
      </nav>
    </div>
  );
}

export default MobileMenu;
