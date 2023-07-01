"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { RiseLoader } from "react-spinners";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
function Categories({
  category,
  allCategories,
  createCategory,
  updateCategory,
}: {
  category: Category;
  allCategories: any;
  createCategory: any;
  updateCategory: any;
}) {
  const [title, setTitle] = useState(category.label);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(category.Image);
  const [parent, setParent] = useState(category.ParentId);
  const [properties, setProperties]: any = useState(category.Properties);
  const router = useRouter();
  function addProperty() {
    setProperties((prev: any) => {
      return [...prev, { name: "", values: "" }];
    });
  }
  function handlePropertyNameChange(
    index: number,
    property: any,
    newName: string
  ) {
    setProperties((prev: any) => {
      const properties = [...prev];
      properties[index].name = newName;
      properties[index].values = "";
      return properties;
    });
  }
  // function handlePropertyValuesChange(
  //   index: number,
  //   property: any,
  //   newValues: Array<string>
  // ) {
  //   setProperties((prev: any) => {
  //     const properties = [...prev];
  //     properties[index].values = newValues;
  //     return properties;
  //   });
  // }
  function removeProperty(indexToRemove: number) {
    setProperties((prev: any) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }
  return (
    <div>
      <div className="mt-2">
        <label htmlFor="title">Category name:</label>
        <form className="flex gap-3 lg:items-end mb-2 flex-col lg:flex-row items-start">
          <input
            className="w-full rounded-lg dark:border-0 border-gray-200 border-2 p-3 text-sm h-12"
            placeholder="eg: Kitchen tools"
            type="text"
            id="title"
            value={title || ""}
            onChange={(e: any) => {
              setTitle(e.target.value);
            }}
          />
          <select
            name=""
            id=""
            className="rounded-md h-12 dark:border-0 border-gray-200 border-2"
            value={parent || ""}
            onChange={(e: any) => {
              setParent(e.target.value);
            }}
          >
            <option value="">No parent selected</option>
            {allCategories &&
              allCategories.map(
                ({ label, id }: { label: string; id: string }) => {
                  return (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  );
                }
              )}
          </select>
          <label htmlFor="files" className="">
            <div
              className={`${
                uploading ? "cursor-not-allowed" : "cursor-pointer "
              } bg-gray-300 text-black relative rounded-md w-36 h-12 flex justify-center items-center`}
            >
              <div className="w-full ">
                {
                  <div className="flex gap-1 justify-center items-center">
                    <p className="text-center ">
                      {img && !uploading && "Replace image"}
                      {!img && !uploading && "Upload image"}
                      {uploading && "Uploading..."}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`"w-6 h-6`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </div>
                }
                <input
                  accept="image/*"
                  disabled={uploading}
                  className="hidden"
                  id="files"
                  type="file"
                  title=" "
                  onChange={async (event: any) => {
                    setImg("");
                    setUploading(true);
                    event.preventDefault();
                    const formData = new FormData();
                    formData.append("file", event.target.files[0]);
                    formData.append("upload_preset", "etttajb9");
                    await axios
                      .post(
                        "https://api.cloudinary.com/v1_1//dqkyatgoy/image/upload",
                        formData
                      )
                      .then((response) => {
                        setImg(response.data.secure_url);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                    setUploading(false);
                  }}
                />
              </div>
            </div>
          </label>
          {img && (
            <Image
              alt="Image"
              width={128}
              height={128}
              src={img}
              className="rounded-md object-contain"
            />
          )}
          {uploading && <Skeleton className="h-20 w-28 bg-gray-500" />}
        </form>

        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="bg-gray-500 rounded-md px-2 text-white py-1 mb-2"
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property: any, index: number) => (
              <div key={index}>
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-1 mb-2 items-start md:items-center"
                >
                  <input
                    type="text"
                    value={property.name}
                    className="mb-0 rounded-md h-12 px-2 w-full dark:border-0 border-gray-200 border-2 "
                    onChange={(ev: any) =>
                      handlePropertyNameChange(index, property, ev.target.value)
                    }
                    placeholder="property name (example: storage)"
                  />
                  {/* <input
                    type="text"
                    className="mb-0 h-12  px-2 rounded-md w-full dark:border-0 border-gray-200 border-2"
                    onChange={(ev: any) =>
                      handlePropertyValuesChange(
                        index,
                        property,
                        ev.target.value
                      )
                    }
                    value={property.values}
                    placeholder="values, comma separated (64GB, 128GB)"
                  /> */}
                  <div>
                    <svg
                      onClick={() => removeProperty(index)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="red"
                      className="w-6 h-6 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
                <div className="h-[1px] mb-2 bg-black"></div>
              </div>
            ))}
        </div>
        <button
          onClick={async () => {
            setLoading(true);
            if (category.id == "") {
              await createCategory({
                label: title,
                Image: img,
                Properties: properties,
                Parent: parent,
              });
            } else {
              await updateCategory({
                id: category.id,
                label: title,
                Image: img,
                Properties: properties,
                Parent: parent,
              });
              router.push("/categories");
              router.refresh();
            }
            setTitle("");
            setImg("");
            setParent("");
            setProperties([]);
            setLoading(false);
          }}
          disabled={!title || !img || loading}
          className={`${
            (!title || !img || loading) && "cursor-not-allowed"
          } rounded-lg bg-blue-700 tracking-widest w-40 py-3 font-medium text-white `}
        >
          {loading ? <RiseLoader color="white" size={7} /> : "Save"}
        </button>
      </div>
    </div>
  );
}

export default Categories;
