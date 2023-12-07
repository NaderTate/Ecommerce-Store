"use client";
import { getLatestProducts } from "@/app/server_actions/products";
import { getLatestCategories } from "@/app/server_actions/categories";

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
