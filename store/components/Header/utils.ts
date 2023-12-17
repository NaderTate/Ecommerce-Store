"use client";

import { usePathname } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import { debounce } from "lodash";
import { useUser } from "@clerk/nextjs";

import { getLatestProducts, search } from "@/actions/products";
import { getLatestCategories } from "@/actions/categories";

import { ProductCardProps } from "@/typings";

export const getNewArrivals = async () => {
  if (localStorage.getItem("newArrivals")) {
    return JSON.parse(localStorage.getItem("newArrivals") as string);
  } else {
    const newArrivals = await getLatestProducts(8);
    localStorage.setItem("newArrivals", JSON.stringify(newArrivals));
    return newArrivals;
  }
};

export const getNewCategories = async () => {
  if (localStorage.getItem("newCategories")) {
    return JSON.parse(localStorage.getItem("newCategories") as string);
  } else {
    const newCategories = await getLatestCategories(8);
    localStorage.setItem("newCategories", JSON.stringify(newCategories));
    return newCategories;
  }
};

export const useFetchNavbarData = () => {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const [scrollY, setScrollY] = useState(0);
  const [newArrivals, setNewArrivals] = useState<ProductCardProps[] | []>([]);
  const [newCategories, setNewCategories] = useState<
    { id: string; label: string; Image: string }[]
  >([]);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    getNewArrivals().then((res: ProductCardProps[]) => {
      setNewArrivals(res);
    });

    getNewCategories().then((res) => {
      setNewCategories(res);
    });

    pathname == "/" && window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);
  return { scrollY, pathname, isSignedIn, newArrivals, newCategories };
};

export const useFetchSearchResults = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{
    products: ProductCardProps[];
    categories: { label: string; Image: string; id: string }[];
  }>({ products: [], categories: [] });
  const resetSearchResults = () => {
    setSearchResults({ products: [], categories: [] });
  };

  // This function is used to fetch search results only after the user has stopped typing for 500ms
  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (searchQuery.length < 2) return;
    setLoading(true);
    const data = await search(searchQuery);
    setSearchResults(data);
    setLoading(false);
  }, 500);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const searchQuery = event.target.value;
    if (searchQuery.length < 2) resetSearchResults();
    setSearchTerms(searchQuery);
    resetSearchResults();
    debouncedSearch(searchQuery);
  }

  return {
    searchTerms,
    loading,
    searchResults,
    handleInputChange,
    resetSearchResults,
  };
};
