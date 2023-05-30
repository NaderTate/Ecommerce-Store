"use client";
import NavLayout from "@/app/components/NavLayout";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import ProductForm from "@/app/components/ProductForm";
function page() {
  const [productInfo, setProductInfo] = useState(null);
  const pathname = usePathname();
  const id = pathname.split("/").slice(-1).toString();
  useEffect(() => {
    if (!id) return;
    axios.get("/api/product?id=" + id).then((res) => {
      setProductInfo(res.data);
    });
  }, [id]);
  return (
    <div>
      <NavLayout>
        <div className="font-bold text-xl mb-5">Edit</div>
        {productInfo && <ProductForm {...productInfo} />}
      </NavLayout>
    </div>
  );
}

export default page;
