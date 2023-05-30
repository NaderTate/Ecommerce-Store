"use client";
import Link from "next/link";
import NavLayout from "../components/NavLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/product").then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <>
      <NavLayout>
        <Link
          className="inline-block rounded-lg bg-blue-700 tracking-widest px-5 py-3 font-medium text-white "
          href="/products/new"
        >
          New
        </Link>
        <div className="grid grid-cols-2 border-b-2 border-r-2 mt-4">
          {products.map(({ _id, Title, Images, Description, Price }) => {
            return (
              <ProductCard
                {...{ Title, Description, Price, _id }}
                Img={Images[0]}
              />
            );
          })}
        </div>
      </NavLayout>
    </>
  );
}
