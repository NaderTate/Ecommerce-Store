// custom hook responsible for managing product form states and submitting the form
"use client";
import { createProduct, updateProduct } from "@/app/server_actions/products";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useHandleProductData = (
  allCategories: { id: string; Properties: CategoryProperty[] }[],
  product?: {
    id?: string;
    Title?: string;
    Description?: string;
    Price?: number;
    Images?: { id: string; img: string }[];
    CategoryIDs?: string[];
    Colors?: string[];
    Properties?: CategoryProperty[];
  }
) => {
  const router = useRouter();
  const [productData, setProductData] = useState({
    Title: product?.Title || "",
    Description: product?.Description || "",
    Price: product?.Price || 0,
    Images: product?.Images || [],
    CategoryIDs: product?.CategoryIDs || [],
    Colors: product?.Colors || [],
    Properties: product?.Properties || [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  const missingData = !(
    productData.Title &&
    productData.Price &&
    productData.Images.length > 1
  );

  // When I select a category, I want the properties of this category to appear so I can choose their values, for example if I choose the "mobiles" category, I want to be able to choose what brand, how much storage, ram ,etc..
  const productCategoriesProperties =
    // map through all categories, find the ones that match the product's category ids, and return their properties
    allCategories
      .filter((category) => productData.CategoryIDs.includes(category.id))
      .map((category) => category.Properties)
      .flat();
  // ⬆️⬆️ copilot saving my life here
  const onSubmit = async () => {
    setSubmitting(true);
    if (product?.id) {
      await updateProduct(product.id, {
        ...productData,
      });
      setSubmitting(false);
      router.push("/products");
    } else {
      await createProduct({
        ...productData,
      });
      setSubmitting(false);
      router.push("/products");
    }
  };

  const handleUploadImages = async (images: File[]) => {
    setUploadingImages(true);
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append("file", images[i]);
      formData.append("upload_preset", "etttajb9");
      await axios
        .post(
          "https://api.cloudinary.com/v1_1//dqkyatgoy/image/upload",
          formData
        )
        .then((response) => {
          setProductData((prev) => {
            return {
              ...prev,
              Images: [
                ...prev.Images,
                {
                  id: response.data.original_filename,
                  img: response.data.secure_url,
                },
              ],
            };
          });
        })
        .catch((error) => {
          alert("error uploading images");
        });
    }
    setUploadingImages(false);
  };

  const handleProductProperty = (name: string, value: string) => {
    const newProductProperties = [...productData.Properties];
    const property = newProductProperties.find((prop) => prop.name == name);
    if (property) {
      property.value = value;
    } else {
      newProductProperties.push({ name, value });
    }
    setProductData({ ...productData, Properties: newProductProperties });
  };

  const deleteImg = (id: string) => {
    setProductData({
      ...productData,
      Images: productData.Images.filter(
        (img: { id: string; img: string }) => img.id != id
      ),
    });
  };

  return {
    productData,
    setProductData,
    productCategoriesProperties,
    submitting,
    missingData,
    onSubmit,
    uploadingImages,
    handleUploadImages,
    handleProductProperty,
    deleteImg,
  };
};
