"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createCategory,
  updateCategory,
} from "@/app/server_actions/categories";
import { CategoryProperty } from "@/typings";

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
  const isMissingData = !(categoryData.label && categoryData.Image);

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

  // Upload category image to cloudinary
  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryData({ ...categoryData, Image: "" });
    setUploadingImage(true);
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.files?.[0];
    if (!file) {
      alert("Please select a valid image");
      return;
    }
    formData.append("file", file);
    formData.append("upload_preset", "etttajb9");
    await fetch("/api/cloudinary", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategoryData({
          ...categoryData,
          Image: data.Image,
        });
        setUploadingImage(false);
      })
      .catch((error) => {
        alert("Error uploading image");
        console.log(error);
      });
  };

  return {
    categoryData,
    setCategoryData,
    isSubmitting,
    uploadingImage,
    isMissingData,
    addProperty,
    handlePropertyNameChange,
    handleUploadImage,
    removeProperty,
    onSubmit,
  };
};
