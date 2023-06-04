"use client";
import React from "react";
import { useState, useEffect } from "react";
import NavLayout from "../components/NavLayout";
import axios from "axios";
import Image from "next/image";
import Skeleton from "../components/Skeleton";
import { RiseLoader } from "react-spinners";
const CategoryCard = ({ image, label, remove, Edit }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <div className="flex flex-col gap-1 relative border-2 rounded-md ">
      <div className="relative  w-[10rem] h-[10rem]">
        <Image className="object-cover rounded-t-md" fill src={image} />
      </div>
      <p className="font-semibold title text-center mb-1">{label}</p>
      <p
        className="absolute top-0 left-0 bg-white/70 rounded-md cursor-default"
        title="39 products"
      >
        39
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 absolute top-0 right-0 bg-white/70 cursor-pointer"
        onClick={Edit}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>

      {confirmDelete ? (
        <div className="absolute right-0 top-8 flex gap-3">
          <svg
            onClick={() => {
              setConfirmDelete(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6 rounded-md cursor-pointer bg-gray-600/70"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          <svg
            onClick={remove}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6 rounded-md cursor-pointer bg-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
      ) : (
        <svg
          onClick={() => {
            setConfirmDelete(true);
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="w-6 h-6 absolute top-8 right-0 cursor-pointer bg-white/70"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      )}
    </div>
  );
};
function Page({ searchParams }) {
  const [newCat, setNewCat] = useState(false);
  const [title, setTitle] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [img, setImg] = useState(null);
  const [parent, setParent] = useState(null);
  const [properties, setProperties] = useState([]);
  const [exists, setExists] = useState(false);
  const [count, setCount] = useState(null);
  const [pages, setPages] = useState(null);
  const [Arr, setArr] = useState();
  const sk = searchParams.page || 1;
  const search = searchParams.search ? searchParams.search : "";
  const getData = async () => {
    setCategories(null);
    const res = await axios.get("/api/category?page=" + sk);
    setCategories(res.data.data);
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
  };
  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }
  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }
  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  useEffect(() => {
    getData();
  }, []);
  const handleUpload = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      label: title,
      Image: img,
      Parent: parent != "" ? parent : undefined,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (exists) {
      axios.put("/api/category", { ...data, _id: exists }).then((res) => {
        if (res.data.success) {
          setLoading(false);
          setNewCat(false);
          setParent(null);
          setImg(null);
          setProperties([]);
          getData();
        }
      });
    } else {
      axios.post("/api/category/", data).then((res) => {
        if (res.data.success) {
          setLoading(false);
          setNewCat(false);
          setParent(null);
          setImg(null);
          setProperties([]);
          getData();
        }
      });
    }
  };
  const editCategory = (name, parent, image, properties, id) => {
    setNewCat(true);
    setTitle(name);
    setParent(parent || "");
    setImg(image);
    setProperties(properties || []);
    if (id) {
      setExists(id);
    } else {
      setExists(false);
    }
  };
  const removeCategory = async (id) => {
    // setLoading(true);
    await axios.delete("/api/category?id=" + id).then((res) => {
      if (res.data.success) {
        getData();
      }
    });
  };
  return (
    <div>
      <NavLayout>
        <div>
          <button
            onClick={() => {
              setNewCat(!newCat);
              setExists(false);
              setTitle(null);
              setParent("");
              setImg(null);
              setProperties([]);
            }}
            className=" rounded-lg bg-blue-700 tracking-widest w-24 py-3 font-medium text-white "
          >
            {newCat ? "Cancel" : "New"}
          </button>
          {newCat && (
            <div className="mt-2">
              <label htmlFor="title">Category name:</label>
              <form
                onSubmit={handleUpload}
                className="flex gap-3 lg:items-end mb-2 flex-col lg:flex-row items-start"
              >
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="eg: Kitchen tools"
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <select
                  name=""
                  id=""
                  className="rounded-md "
                  value={parent}
                  onChange={(e) => {
                    setParent(e.target.value);
                  }}
                >
                  <option value="">No parent selected</option>
                  {categories &&
                    categories.map(({ label, _id }) => {
                      return (
                        <option key={_id} value={_id}>
                          {label}
                        </option>
                      );
                    })}
                </select>
                <label htmlFor="files" className="">
                  <div
                    className={`${
                      uploading ? "cursor-not-allowed" : "cursor-pointer "
                    } bg-gray-300 relative rounded-md w-36 h-12 flex justify-center items-center`}
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
                        onChange={async (event) => {
                          setImg(null);
                          setUploading(true);
                          event.preventDefault();
                          const formData = new FormData();
                          formData.append(
                            "file",
                            Array.from(event.target.files)[0]
                          );
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
                {img && <img src={img} className="w-28 rounded-md" />}
                {uploading && <Skeleton height="h-20" width="w-28" />}
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
                  properties.map((property, index) => (
                    <div key={index}>
                      <div className="flex flex-col lg:flex-row lg:items-center gap-1 mb-2">
                        <input
                          type="text"
                          value={property.name}
                          className="mb-0 rounded-md"
                          onChange={(ev) =>
                            handlePropertyNameChange(
                              index,
                              property,
                              ev.target.value
                            )
                          }
                          placeholder="property name (example: color)"
                        />
                        <input
                          type="text"
                          className="mb-0 rounded-md"
                          onChange={(ev) =>
                            handlePropertyValuesChange(
                              index,
                              property,
                              ev.target.value
                            )
                          }
                          value={property.values}
                          placeholder="values, comma separated"
                        />
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
                      <div className="h-[1px] mb-2 bg-black"></div>
                    </div>
                  ))}
              </div>
              <button
                onClick={handleUpload}
                disabled={!title || !img || loading}
                className={`${
                  (!title || !img || loading) && "cursor-not-allowed"
                } rounded-lg bg-blue-700 tracking-widest w-40 py-3 font-medium text-white `}
              >
                {loading ? <RiseLoader color="white" size={7} /> : "Save"}
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {categories &&
            categories.map(({ Image, label, _id, Parent, properties }) => {
              return (
                <div key={_id}>
                  <CategoryCard
                    remove={() => {
                      removeCategory(_id);
                    }}
                    id={_id}
                    label={label}
                    image={Image}
                    parent={Parent}
                    allCategories={categories}
                    getData={() => {
                      getData();
                    }}
                    Edit={() => {
                      editCategory(label, Parent?._id, Image, properties, _id);
                    }}
                  />
                </div>
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
        {!categories && (
          <div className="flex justify-center items-center h-[80vh] ">
            <RiseLoader color="#1d4ed8" />
          </div>
        )}
        {categories?.length == 0 && (
          <div className="flex justify-center items-center h-[80vh] ">
            You haven&apos;t added any categories yet
          </div>
        )}
      </NavLayout>
    </div>
  );
}

export default Page;
