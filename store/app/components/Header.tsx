"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta/client";
import MobileMenu from "./MobileMenu";
import { useRouter } from "next/navigation";
import {
  AiFillHeart,
  AiOutlineCloseCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { PiMagnifyingGlassBold } from "react-icons/pi";
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
  cart,
  Whishlist,
  newArrivals,
  Discover,
  userImage,
  search,
}: {
  cart: any;
  Whishlist: Array<object>;
  newArrivals: Array<object>;
  Discover: Array<object>;
  userImage: string;
  search: any;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerms, setSearchTerms] = React.useState("");
  const [predictions, setPredictions] = React.useState([]);
  let count: number = 0;
  cart.map(({ quantity }: { quantity: number }) => (count = count + quantity));
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
                    onChange={async (e) => {
                      setSearchTerms(e.target.value);
                      if (e.target.value.length > 2) {
                        setPredictions(await search(e.target.value));
                      } else {
                        setPredictions([]);
                      }
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
                      <PiMagnifyingGlassBold
                        size={25}
                        className="cursor-pointer"
                      />
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
                    <Image
                      width={30}
                      height={30}
                      src={userImage}
                      className="rounded-full object-cover"
                      alt=""
                    />
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
                  <AiFillHeart size={25} />
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
                      href={{ pathname: "/whishlist" }}
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
                  <div className="relative">
                    <AiOutlineShoppingCart size={25} />
                    <span className="absolute -bottom-3 -right-3 bg-black/50 rounded-full text-white w-5 h-5 text-xs flex items-center justify-center">
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
      {predictions.length > 0 && (
        <div className="w-screen flex justify-center relative">
          <div className="absolute  z-10 ml-5 flex flex-wrap gap-5 bg-white/90 dark:bg-black/90  justify-around p-5 rounded-md ">
            <div className="absolute top-0 right-0">
              <AiOutlineCloseCircle
                onClick={() => {
                  setPredictions([]);
                }}
                className="cursor-pointer"
                size={20}
              />
            </div>
            {predictions.map(({ id, label, Image: img }) => {
              return (
                <Link
                  key={id}
                  onClick={() => {
                    setPredictions([]);
                  }}
                  href={{ pathname: `/categories/${id}` }}
                >
                  <Image
                    width={75}
                    height={75}
                    src={img}
                    className="w-24 rounded-md"
                    alt={label}
                  />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      {/* Mobile stuff */}
      <div className="block md:hidden">
        <div className="absolute flex top-2 items-center right-2 z-[4] gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="mt-2">Sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href={{ pathname: "/cart" }}>
              <div className="relative p-2">
                <AiOutlineShoppingCart size={25} />
                <span className="absolute bottom-0 right-0">{count}</span>
              </div>
            </Link>
          </SignedIn>
          <SignedIn>
            <AccountLinksMenu userImage={userImage} />
          </SignedIn>
        </div>
        <MobileMenu
          search={async (e: string) => {
            return await search(e);
          }}
        />
      </div>
    </div>
  );
}
