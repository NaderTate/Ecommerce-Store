"use client";
// This hook can is responsible for fetching products, it can take either a categoryId or search keyword as a query.
// The function that fetches using a categoryId is different from the one that fetches using a keyword, merging both in one function would make the code look messy.
import { useEffect, useState } from "react";

import {
  calculatePriceFilter,
  getCategoryProducts,
} from "@/app/(public)/categories/[id]/utils";
import { getSearchResults } from "@/app/(public)/search/utils";

import { productsPerPage } from "@/lib/global_variables";
import { getSimilarCategories } from "@/actions/categories";

export const useFetchProducts = (query: {
  categoryId?: string;
  searchQuery?: string;
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<
    | {
        price?: "asc" | "desc" | undefined;
        id?: "desc" | undefined;
      }
    | undefined
  >(undefined);
  const [products, setProducts] = useState<
    | {
        id: string;
        Title: string;
        mainImg: string;
        secondImage: string;
        Price: number;
      }[]
    | undefined
  >(undefined);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [pricesList, setPricesList] = useState<number[] | undefined>(undefined);
  const [similarCategories, setSimilarCategories] = useState<
    { id: string; label: string }[] | undefined
  >(undefined);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      // if there's a categoryId, run the function that fetches using a categoryId, else run the function that fetches using a keyword.
      const { products, count, highestPrice, lowestPrice } = query.categoryId
        ? await getCategoryProducts(
            query.categoryId,
            {
              limit: productsPerPage,
              skip: page * productsPerPage - productsPerPage,
            },
            { minPrice, maxPrice, minRating },
            sortBy
          )
        : query.searchQuery
        ? await getSearchResults(
            query.searchQuery,
            {
              limit: productsPerPage,
              skip: page * productsPerPage - productsPerPage,
            },
            { minPrice, maxPrice, minRating },
            sortBy
          )
        : { products: [], count: 0, highestPrice: 0, lowestPrice: 0 };
      setProducts(products);
      setLoading(false);
      setProductsCount(count);
      !pricesList &&
        setPricesList(await calculatePriceFilter(highestPrice, lowestPrice, 5));
      // Yes, I used "await" with a synchronous function, not doing so will trigger an error, don't ask me why or how...
      setSimilarCategories(await getSimilarCategories(query));
    };
    getProducts();
    if (minPrice || maxPrice || minRating || sortBy) {
      setIsFilterApplied(true);
    } else {
      setIsFilterApplied(false);
    }
  }, [
    query.categoryId,
    query.searchQuery,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
    page,
  ]);

  const clearFilters = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setMinRating(undefined);
    setSortBy(undefined);
    setPage(1);
  };

  return {
    products,
    productsCount,
    pricesList,
    similarCategories,
    loading,
    isFilterApplied,
    clearFilters,
    setMinPrice,
    setMaxPrice,
    setMinRating,
    setSortBy,
    setPage,
    page,
  };
};
