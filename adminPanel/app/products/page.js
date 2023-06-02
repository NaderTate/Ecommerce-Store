"use client";
import Link from "next/link";
import NavLayout from "../components/NavLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import RiseLoader from "react-spinners/RiseLoader";
export default function Home({ searchParams }) {
  const sk = searchParams.page || 1;
  const search = searchParams.search ? searchParams.search : "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(null);
  const [pages, setPages] = useState(null);
  const [Arr, setArr] = useState();
  const getProducts = async () => {
    setProducts([]);
    setLoading(true);
    const res = await axios.get("/api/product?page=" + sk);
    setProducts(res.data.data);
    setCount(res.data.count);
    setPages(
      Array.from({ length: Math.ceil(res.data.count / 20) }, (_, i) => i + 1)
    );
    const pagenateArr = (arr, p) => {
      let newArr = [];
      arr.forEach((element) => {
        if (Math.abs(element - p) <= 2) {
          newArr = [...newArr, element];
        }
      });
      return newArr;
    };
    setArr(
      pagenateArr(
        Array.from({ length: Math.ceil(res.data.count / 20) }, (_, i) => i + 1),
        sk
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);
  const deleteProduct = async (id) => {
    setLoading(true);
    await axios.delete("/api/product?id=" + id).then((res) => {
      if (res.data.success) {
        getProducts();
      }
    });
  };
  return (
    <>
      <NavLayout>
        <Link
          className=" rounded-lg bg-blue-700 tracking-widest px-5 py-3 font-medium text-white "
          href="/products/new"
        >
          New
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 mt-4 gap-4">
          {products.map(({ _id, Title, Images, Description, Price }) => {
            return (
              <ProductCard
                key={_id}
                {...{ Title, Description, Price, _id }}
                Img={Images[0]?.img}
                deleteItem={() => {
                  deleteProduct(_id);
                }}
              />
            );
          })}
        </div>
        {pages && Arr && (
          <ol className="flex justify-center gap-1 mt-16 text-sm font-medium">
            <li>
              <a
                href={`/products?page=${pages.at(0)}&search=${search}`}
                className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full hover:bg-slate-400/50 transition "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            {Arr &&
              Arr.map((page) => (
                <li key={page}>
                  <a
                    href={`/products?page=${page}&search=${search}`}
                    className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full hover:bg-slate-400/50 transition"
                  >
                    {page}
                  </a>
                </li>
              ))}
            <li>
              <a
                href={`/products?page=${pages.at(-1)}&search=${search}`}
                className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full hover:bg-slate-400/50 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ol>
        )}
      </NavLayout>
      {loading && (
        <div className="absolute bottom-1 right-1">
          <RiseLoader color="#1D4ED8" size={7} />
        </div>
      )}
    </>
  );
}
