"use client";
import {
  createCategory,
  updateCategory,
} from "@/app/server_actions/categories";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const useHandleCategoryData = (category?: {
  id?: string;
  label?: string;
  value?: number;
  Image?: string;
  Properties?: CategoryProperty[];
  ParentId?: string | null;
}) => {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState({
    label: category?.label || "",
    Image: category?.Image || "",
    ParentId: category?.ParentId || null,
    Properties: category?.Properties || [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const missingData = !(categoryData.label && categoryData.Image);
  function addProperty() {
    setCategoryData({
      ...categoryData,
      Properties: [...categoryData.Properties, { name: "", value: "" }],
    });
  }
  function handlePropertyNameChange(
    index: number,
    property: any,
    newName: string
  ) {
    const newProperties = [...categoryData.Properties];
    newProperties[index].name = newName;
    setCategoryData({ ...categoryData, Properties: newProperties });
  }
  function removeProperty(indexToRemove: number) {
    setCategoryData({
      ...categoryData,
      Properties: categoryData.Properties.filter(
        (property, index) => index !== indexToRemove
      ),
    });
  }

  const onSubmit = async () => {
    setIsSubmitting(true);
    if (category?.id) {
      await updateCategory(category.id, {
        ...categoryData,
      });
      setIsSubmitting(false);
    } else {
      await createCategory({
        ...categoryData,
      });
      setIsSubmitting(false);
    }
    router.push("/categories");
  };

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryData({ ...categoryData, Image: "" });
    setUploadingImage(true);
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.files?.[0];
    if (!file) return;
    formData.append("file", file);
    formData.append("upload_preset", "etttajb9");
    await axios
      .post("https://api.cloudinary.com/v1_1//dqkyatgoy/image/upload", formData)
      .then((response) => {
        setCategoryData({
          ...categoryData,
          Image: response.data.secure_url,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setUploadingImage(false);
  };
  return {
    categoryData,
    setCategoryData,
    isSubmitting,
    uploadingImage,
    missingData,
    addProperty,
    handlePropertyNameChange,
    handleUploadImage,
    removeProperty,
    onSubmit,
  };
};
