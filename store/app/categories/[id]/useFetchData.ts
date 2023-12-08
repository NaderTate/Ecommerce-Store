"use client";

import { useEffect, useState } from "react";
import {
  calculatePriceFilter,
  getCategoryProducts,
  getSimilarCategories,
} from "./utils";

export const useFetchData = (categoryId: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<
    | {
        price?: "asc" | "desc" | undefined;
        id?: "desc" | undefined;
      }
    | undefined
  >(undefined);
  const [products, setProducts] = useState<
    {
      id: string;
      Title: string;
      mainImg: string;
      secondImage: string;
      Price: number;
    }[]
  >([]);
  const [productsCount, setProductsCount] = useState<number | undefined>(
    undefined
  );
  const [pricesList, setPricesList] = useState<number[] | undefined>(undefined);
  const [similarCategories, setSimilarCategories] = useState<
    { id: string; label: string }[] | undefined
  >(undefined);
  useEffect(() => {
    const getProducts = async () => {
      const { products, count, highestPrice, lowestPrice } =
        await getCategoryProducts(
          categoryId,
          { limit: 30, skip: 0 },
          { minPrice, maxPrice, minRating },
          sortBy
        );
      setProducts(products);
      setProductsCount(count);
      !pricesList &&
        setPricesList(await calculatePriceFilter(highestPrice, lowestPrice, 5));
      // Yes, I used "await" with a non async function, not doing so will trigger an error, don't ask me why or how...
      setSimilarCategories(await getSimilarCategories(categoryId));
    };
    getProducts();
  }, [categoryId, minPrice, maxPrice, minRating, sortBy]);
  return {
    products,
    productsCount,
    pricesList,
    similarCategories,
    setMinPrice,
    setMaxPrice,
    setMinRating,
    setSortBy,
  };
};
