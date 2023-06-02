"use client";
import React from "react";
import { useState, useEffect } from "react";
import NavLayout from "../components/NavLayout";
import axios from "axios";
import Image from "next/image";
import Skeleton from "../components/Skeleton";
import { RiseLoader } from "react-spinners";
const CategoryCard = ({
  image,
  label,
  remove,
  id,
  parent,
  allCategories,
  getData,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(label);
  const [img, setImg] = useState(image);
  const [Parent, setParent] = useState(parent?._id ? parent._id : null);
  let data = {};
  const handleUpdate = () => {
    setLoading(true);
    if (Parent == "") {
      data = { label: title, Image: img, _id: id };
    } else {
      data = { label: title, Image: img, _id: id, Parent };
    }
    axios.put("/api/category", data).then((res) => {
      if (res.data.success) {
        setLoading(false);
        setEdit(false);
        getData();
      }
    });
  };
  return (
    <div className="flex flex-col gap-3 relative border-2 rounded-md ">
      <div className="relative  w-[10rem] h-[10rem]">
        {img ? (
          <Image className="object-cover rounded-l-md" fill src={img} />
        ) : (
          <Skeleton width="w-[10rem]" height="h-[10rem]" />
        )}
      </div>
      <div>
        {edit ? (
          <div className="flex flex-col ">
            <input
              className="h-5 w-[10rem] rounded-md"
              type="text"
              defaultValue={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <select
              name=""
              id=""
              className="rounded-md w-[10rem] text-sm my-1"
              value={Parent}
              onChange={(e) => {
                setParent(e.target.value);
                console.log(typeof e.target.value);
              }}
            >
              <option value="">No parent</option>
              {allCategories &&
                allCategories.map(({ label, _id }) => {
                  return (
                    <option key={_id} value={_id}>
                      {label}
                    </option>
                  );
                })}
            </select>
          </div>
        ) : (
          <p className="font-semibold title">{title}</p>
        )}
        {edit ? (
          loading ? (
            <div className=" text-center bg-gray-300 rounded-md w-[10rem] h-5">
              Saving...
            </div>
          ) : (
            <div>
              <form onSubmit={handleUpdate} className="flex gap-3 mb-2">
                <label htmlFor="files" className="">
                  <div
                    className={`${
                      uploading ? "cursor-not-allowed" : "cursor-pointer "
                    } bg-gray-300 relative rounded-md w-[10rem] h-5 flex justify-center items-center`}
                  >
                    <div className="w-full ">
                      {
                        <div className="flex gap-1 justify-center items-center text-sm">
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
                            className={`"w-3 h-3`}
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
                              console.log(response);
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
              </form>
            </div>
          )
        ) : // <p className="description text-sm">X products</p>
        parent?.label ? (
          <p className="description text-sm">Parent: {parent?.label}</p>
        ) : (
          <p className=" opacity-0 text-sm description">.</p>
        )}
      </div>
      {edit ? (
        <div className="flex gap-3 absolute top-0 right-0">
          <svg
            onClick={() => {
              setEdit(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer bg-white/70 rounded-md"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <svg
            disabled={uploading}
            onClick={handleUpdate}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 bg-white/70 rounded-md ${
              uploading ? "cursor-not-allowed" : "cursor-pointer "
            } `}
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
            setEdit(true);
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 absolute right-0 top-0 cursor-pointer bg-white/70"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      )}

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
            stroke="currentColor"
            className="w-6 h-6 rounded-md cursor-pointer bg-white/70"
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
            stroke="currentColor"
            className="w-6 h-6 rounded-md cursor-pointer bg-white/70"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
      ) : (
        !edit && (
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
        )
      )}
    </div>
  );
};
function page() {
  const [newCat, setNewCat] = useState(false);
  const [title, setTitle] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [img, setImg] = useState(null);
  const [parent, setParent] = useState(null);
  const [properties, setProperties] = useState([]);
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
  const getData = () => {
    setCategories(null);
    axios.get("/api/category").then((res) => {
      setCategories(res.data.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const handleUpload = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      label: title,
      Image: img,
      Parent: parent,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    axios.post("/api/category/", data).then((res) => {
      if (res.data.success) {
        setLoading(false);
        setNewCat(false);
        setParent(null);
        setImg(null);
        getData();
      }
    });
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
                className="flex gap-3 items-end mb-2"
              >
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="eg: Kitchen tools"
                  type="text"
                  id="title"
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
                    <div
                      key={property.name}
                      className="flex items-center gap-1 mb-2"
                    >
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
                  ))}
              </div>
              <button
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
        <div className="flex flex-wrap gap-5 mt-5">
          {categories &&
            categories.map(({ Image, label, _id, Parent }) => {
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
                  />
                </div>
              );
            })}
        </div>
        {!categories && (
          <div className="flex justify-center items-center  h-[80vh] ">
            <RiseLoader color="#1d4ed8" />
          </div>
        )}
        {categories?.length == 0 && (
          <div className="flex justify-center items-center  h-[80vh] ">
            You haven't added any categories yet
          </div>
        )}
      </NavLayout>
    </div>
  );
}

export default page;
