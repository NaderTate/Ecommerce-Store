"use client";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ThemeButton from "../Header/ThemeButton";
import { usePathname } from "next/navigation";
import ProductCard from "../ProductCard";
import CategoryCard from "../CategoryCard";
import { useState } from "react";
import { IoMdLogIn } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import UserAvatar from "../Header/userAvatar";
import { useUser } from "@clerk/nextjs";
import Search from "../Header/Search";
import MobileMenu from "./mobileMenu";
import { getNewArrivals, getNewCategories } from "./utils";
import WishlistSection from "./WishlistSection";
import CartSection from "./CartSection";
type Props = {
  cart: {
    cartItems: {
      Product: {
        id: string;
        Title: string;
        Price: number;
        mainImg: string;
        secondImage: string;
      };
      Quantity: number;
    }[];
    totalCount: number;
    totalPrice: number;
  } | null;
  Whishlist: {
    wishlistItems: {
      Product: {
        id: string;
        Title: string;
        Price: number;
        mainImg: string;
        secondImage: string;
      };
    }[];
    totalCount: number;
  } | null;
};

export default function Header({ cart, Whishlist }: Props) {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const { isSignedIn } = useUser();
  const [newArrivals, setNewArrivals] = useState<
    | {
        id: string;
        Title: string;
        Price: number;
        mainImg: string;
        secondImage: string;
      }[]
    | []
  >([]);
  const [newCategories, setNewCategories] = useState<
    { id: string; label: string; Image: string }[]
  >([]);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    getNewArrivals().then(
      (
        res: {
          id: string;
          Title: string;
          Price: number;
          mainImg: string;
          secondImage: string;
        }[]
      ) => {
        setNewArrivals(res);
      }
    );
    getNewCategories().then((res) => {
      setNewCategories(res);
    });
    pathname == "/" && window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <div
        className={`hidden md:block fixed top-0 z-20 w-full backdrop-blur-xl ${
          pathname == "/" && scrollY < window.innerHeight
            ? "text-black"
            : "text-inherit"
        }`}
      >
        <NavigationMenu className="w-full">
          <NavigationMenuList className="flex justify-between w-[95vw] items-center">
            <NavigationMenuItem className="cursor-pointer">
              {/* Logo */}
              <Link
                href={{ pathname: "/" }}
                legacyBehavior
                passHref
                className="cursor-pointer"
              >
                <Image src={"/logo.webp"} width={50} height={50} alt="Logo" />
              </Link>
            </NavigationMenuItem>

            <div className="flex absolute justify-center right-0 left-0 ">
              {/* New Arrivals section */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent">
                  New Arrivals
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-default-50">
                  <div className="p-5">
                    <div className="flex flex-wrap w-[750px] gap-5 justify-around  dark:text-white">
                      {newArrivals.map((product: any) => {
                        return (
                          <div key={product.id} className="w-36">
                            <ProductCard product={product} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </NavigationMenuContent>
                {/* Discover section */}
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent">
                  Discover
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-default-50">
                  <div className="p-5">
                    <div className="flex flex-wrap w-[750px] gap-5 justify-around  dark:text-white text-center">
                      {newCategories.map((category) => {
                        return (
                          <div key={category.id} className="w-36">
                            <CategoryCard category={category} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </div>

            <div className="flex items-center gap-x-3 z-20">
              <NavigationMenuItem>
                <Search />
              </NavigationMenuItem>
              <ThemeButton />
              <NavigationMenuItem>
                {isSignedIn ? (
                  <div className="flex gap-x-3 items-center">
                    {/* Whishlist */}
                    <NavigationMenuItem className="">
                      <NavigationMenuTrigger className="bg-transparent p-0 ">
                        <FaRegHeart size={25} />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-default-50 min-w-[750px]">
                        <WishlistSection Whishlist={Whishlist} />
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    {/* Cart */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent p-0">
                        <div className="relative">
                          <AiOutlineShoppingCart size={25} />
                          <span className="absolute -bottom-3 -right-3 bg-black/50 rounded-full text-white w-5 h-5 text-xs flex items-center justify-center">
                            {cart?.totalCount || 0}
                          </span>
                        </div>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-default-50">
                        <CartSection cart={cart} />
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <UserAvatar />
                  </div>
                ) : (
                  <SignInButton redirectUrl={pathname} mode="modal">
                    <IoMdLogIn size={25} className="cursor-pointer" />
                  </SignInButton>
                )}
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="md:hidden">
        <MobileMenu />
      </div>
    </div>
  );
}
