"use client";
import Link from "next/link";
import NavLayout from "../components/NavLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import RiseLoader from "react-spinners/RiseLoader";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProducts = () => {
    setProducts([]);
    setLoading(true);
    axios.get("/api/product").then((response) => {
      setProducts(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);
  const deleteProduct = async (id) => {
    setLoading(true);
    await axios.delete("/api/product?id=" + id).then((res) => {
      if (res.data.success) {
        // setDeleted(true);
        // setProducts((current) => current.filter((product) => product._id != id));
        // setDeleted(false);
      }
      getProducts();
    });
  };
  return (
    <>
      <NavLayout>
        <Link
          className="inline-block rounded-lg bg-blue-700 tracking-widest px-5 py-3 font-medium text-white "
          href="/products/new"
        >
          New
        </Link>
        <div className="grid grid-cols-2 mt-4 gap-4">
          {products.map(({ _id, Title, Images, Description, Price }) => {
            return (
              <ProductCard
                {...{ Title, Description, Price, _id }}
                Img={Images[0]?.img}
                deleteItem={() => {
                  deleteProduct(_id);
                }}
              />
            );
          })}
        </div>
      </NavLayout>
      {loading && (
        <div className="absolute bottom-1 right-1">
          <RiseLoader color="#1D4ED8" size={7} />
        </div>
      )}
    </>
  );
}
