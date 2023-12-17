"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Input } from "@nextui-org/react";

import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

type Props = {};

const Footer = ({}: Props) => {
  const pathname = usePathname();

  return (
    <footer
      className={`${
        (pathname.includes("/categories") || pathname.includes("/search")) &&
        " md:ml-56"
      }`}
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 items-center">
          <div className="border-b  py-8 lg:order-last lg:border-b-0 lg:py-16 lg:ps-16 space-y-5">
            <p>
              Sign up to get 10% off your first order and early access to our
              latest collections, sales and more.
            </p>
            <Input
              type="email"
              label="Your email address"
              endContent={<Button color="primary">Subscribe</Button>}
            />
            <div className="flex items-center gap-5">
              <CiInstagram className="cursor-pointer" size={30} />
              <FaFacebook className="cursor-pointer" size={30} />
              <BsTwitterX className="cursor-pointer" size={30} />
              <CiLinkedin className="cursor-pointer" size={30} />
            </div>
          </div>

          <div className="py-8 lg:py-16 lg:pe-16">
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <p className="font-medium ">Shop</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link
                      href={{
                        pathname: "/categories/648337b7223afa484880f4fb",
                      }}
                      className=" transition hover:opacity-75"
                    >
                      Women fashion
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={{
                        pathname: "/categories/64833a2edbbe74f153ec7938",
                      }}
                      className=" transition hover:opacity-75"
                    >
                      Men fashion
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={{
                        pathname: "/categories/64835031082e25fade6967c6",
                      }}
                      className=" transition hover:opacity-75"
                    >
                      Fitness Equipments
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/categories/648349093d5e7e6f8b558119",
                      }}
                      className=" transition hover:opacity-75"
                    >
                      Fitness Equipments
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium ">Help</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link href={"#"} className=" transition hover:opacity-75">
                      Contact Us
                    </Link>
                  </li>

                  <li>
                    <Link href={"#"} className=" transition hover:opacity-75">
                      FAQs
                    </Link>
                  </li>

                  <li>
                    <Link href={"#"} className=" transition hover:opacity-75">
                      Accessibility
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium ">About</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link href={"#"} className=" transition hover:opacity-75">
                      Our story
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={"https://github.com/NaderTate"}
                      target="_blank"
                      className=" transition hover:opacity-75"
                    >
                      Founder
                    </Link>
                  </li>

                  <li>
                    <Link href={"#"} className=" transition hover:opacity-75">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8">
              <ul className="flex flex-wrap gap-4 text-xs">
                <li>
                  <Link href={"#"} className=" transition hover:opacity-75">
                    Terms & Conditions
                  </Link>
                </li>

                <li>
                  <Link href={"#"} className=" transition hover:opacity-75">
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link href={"#"} className=" transition hover:opacity-75">
                    Cookies
                  </Link>
                </li>
              </ul>

              <p className="mt-8 text-xs ">
                &copy; 2024. Nader Express. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
