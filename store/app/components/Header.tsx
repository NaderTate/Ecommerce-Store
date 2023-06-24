"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta/client";
import MobileMenu from "./MobileMenu";
import { useRouter } from "next/navigation";
import {
  HeartIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ThemeButton from "./ThemeButton";
import { usePathname } from "next/navigation";
import ProductCard from "./ProductCard";
import CategoryCard from "./CategoryCard";
import AccountLinksMenu from "./AccountLinksMenu";
export default function Header({
  count,
  cart,
  Whishlist,
  newArrivals,
  Discover,
  userImage,
}: {
  count: number;
  cart: any;
  Whishlist: Array<object>;
  newArrivals: Array<object>;
  Discover: Array<object>;
  userImage: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerms, setSearchTerms] = React.useState("");
  return (
    <div>
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href={{ pathname: "/" }} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {/* New Arrivals section */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>New Arrivals</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-5">
                  <div className="flex flex-wrap w-[750px] gap-5 justify-around mb-5">
                    {newArrivals.map((product: any) => {
                      return (
                        <ProductCard
                          key={product.id}
                          product={product}
                          width="w-24"
                          height="h-24"
                        />
                      );
                    })}
                  </div>
                  <Link
                    className="font-bold tracking-wider"
                    href={{ pathname: "/products" }}
                  >
                    Check all our products
                  </Link>
                </div>
              </NavigationMenuContent>
              {/* Discover section */}
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-5">
                  <div className="flex flex-wrap w-[750px] gap-5 justify-around mb-5">
                    {Discover.map((category: any) => {
                      return (
                        <CategoryCard
                          key={category.id}
                          category={category}
                          width="w-24"
                          height="h-24"
                        />
                      );
                    })}
                  </div>
                  <Link
                    className="font-bold tracking-wider"
                    href={{ pathname: "/categories" }}
                  >
                    Discover more
                  </Link>
                </div>
              </NavigationMenuContent>
              {/* Search bar */}
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="relative">
                <form action="">
                  <input
                    type="text"
                    placeholder="Search anything..."
                    className="rounded-md py-1 px-3 dark:border-none border border-gray-400"
                    onChange={(e) => {
                      setSearchTerms(e.target.value);
                    }}
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
                  >
                    <span className="absolute inset-y-0 inline-flex items-center right-4">
                      <MagnifyingGlassIcon className="w-6 h-6 cursor-pointer" />
                    </span>
                  </button>
                </form>
              </div>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="mx-5">
                <SignedIn>
                  {/* <UserButton
                    userProfileMode="navigation"
                    userProfileUrl={
                      typeof window !== "undefined"
                        ? `${window.location.origin}/account`
                        : undefined
                    }
                    afterSignOutUrl={pathname}
                  /> */}
                  <Link href={{ pathname: "/account" }}>
                    <div className="relative w-7 h-7">
                      <Image
                        fill
                        src={userImage}
                        className="rounded-full"
                        alt=""
                      />
                    </div>
                  </Link>
                </SignedIn>
                <SignedOut>
                  <SignInButton redirectUrl={pathname} mode="modal">
                    <button>Sign in</button>
                  </SignInButton>
                </SignedOut>
              </div>
            </NavigationMenuItem>
            <SignedIn>
              {/* Whishlist */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <HeartIcon className="w-6 h-6 " />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-5">
                    <div className="flex flex-wrap min-w-[750px] gap-5 mb-5">
                      {Whishlist.length > 0
                        ? Whishlist.map((product: any) => {
                            return (
                              <ProductCard
                                key={product.id}
                                product={product}
                                width="w-24"
                                height="h-24"
                              />
                            );
                          })
                        : "Your whish list is empty :("}
                    </div>
                    <Link
                      className="font-bold tracking-wider"
                      href={{ pathname: "/cart" }}
                    >
                      Manage your whish list
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </SignedIn>
            <SignedIn>
              {/* Cart */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <div className="relative p-3">
                    <ShoppingCartIcon className="w-6 h-6 " />
                    <span className="absolute bottom-0 right-0 bg-black/50 rounded-full text-white w-5 h-5 text-xs flex items-center justify-center">
                      {count}
                    </span>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-5">
                    <div className="flex flex-wrap w-[750px] gap-5 mb-5">
                      {cart.length > 0
                        ? cart.map(
                            ({
                              product,
                              quantity,
                            }: {
                              product: any;
                              quantity: number;
                            }) => {
                              return (
                                <ProductCard
                                  key={product.id}
                                  product={product}
                                  width="w-24"
                                  height="h-24"
                                  quantity={quantity}
                                />
                              );
                            }
                          )
                        : "Your cart is empty :("}
                    </div>
                    <Link
                      className="font-bold tracking-wider"
                      href={{ pathname: "/cart" }}
                    >
                      Review and checkout
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </SignedIn>

            <ThemeButton />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* Mobile stuff */}
      <div className="block md:hidden">
        <div className="absolute flex top-2 items-center right-2 z-[4] gap-2">
          {/* <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn> */}
          <SignedOut>
            <SignInButton mode="modal">
              <button>Sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="relative p-2">
              <ShoppingCartIcon className="w-6 h-6 " />
              <span className="absolute bottom-0 right-0">{count}</span>
            </div>
          </SignedIn>
          <AccountLinksMenu userImage={userImage} />
        </div>
        <MobileMenu />
      </div>
    </div>
  );
}
