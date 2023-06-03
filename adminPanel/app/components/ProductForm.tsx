"use client";
import axios from "axios";
import React from "react";
import Select from "react-select";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import RiseLoader from "react-spinners/RiseLoader";
import Skeleton from "./Skeleton";
import { ReactSortable } from "react-sortablejs";
import PropTypes, { InferProps } from "prop-types";
import { createProductAction, updateProductAction } from "@/app/_actions";
function Card({ src, title, deleteImage }: InferProps<typeof Card.propTypes>) {
  return (
    <div className="relative ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="red"
        className="w-6 h-6 absolute right-0 top-0 bg-white/50 cursor-pointer"
        onClick={deleteImage}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

      {src && title && (
        <img
          src={src}
          alt={title}
          className="rounded-md object-cover w-32 h-32 "
        />
      )}
    </div>
  );
}
Card.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  deleteImage: PropTypes.any,
};
ProductForm.propTypes = {
  id: PropTypes.string,
  Title: PropTypes.string,
  Price: PropTypes.number,
  Description: PropTypes.string,
  Categories: PropTypes.array,
  Colors: PropTypes.array,
  Images: PropTypes.array,
};
function ProductForm({
  id,
  Title,
  Price,
  Description,
  Categories: currentCategories,
  Colors: currentColors,
  Images,
}: InferProps<typeof ProductForm.propTypes>) {
  const router = useRouter();
  const Colors = [
    { value: 1, label: "Red" },
    { value: 2, label: "Green" },
    { value: 3, label: "Black" },
  ];
  const [Categories, setCategories] = useState(currentCategories || []);
  const [colors, setColors] = useState(currentColors || []);
  const [title, setTitle] = useState(Title || "");
  const [price, setPrice] = useState(Number(Price) || 0);
  const [description, setDescription] = useState(Description || "");
  const [images, setImages] = useState(Images || []);
  const [loading, setLoading] = useState(false);
  const [missingData, setMissingData] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [isPending, startTransition] = useTransition();

  async function action() {
    if (id) {
      setLoading(true);
      startTransition(
        async () =>
          await updateProductAction(
            id,
            title,
            price,
            images,
            description,
            [{ title: "Rev1" }],
            Categories,
            colors
          )
      );
      setLoading(false);
      router.push("/products");
    } else {
      setLoading(true);
      await createProductAction(
        title,
        price,
        images,
        description,
        [{ title: "Rev1" }],
        Categories,
        colors
      );
      setLoading(false);
      router.push("/products");
    }
  }
  useEffect(() => {
    axios.get("/api/category").then((res) => {
      setAllCategories(res.data.data);
    });
  }, []);
  function updateImagesOrder(images: any) {
    setImages(images);
  }
  const handleUpload = async (e: any) => {
    setUploading(true);
    e.preventDefault();
    for (let i = 0; i <= uploadFile.length; i++) {
      const formData = new FormData();
      formData.append("file", uploadFile[i]);
      formData.append("upload_preset", "etttajb9");

      await axios
        .post(
          "https://api.cloudinary.com/v1_1//dqkyatgoy/image/upload",
          formData
        )
        .then((response) => {
          setUploadFile((current) =>
            current.filter(
              (file: any) =>
                file.name.split(".")[0] != response.data.original_filename
            )
          );

          console.log(response);
          setImages((oldImages: any) => [
            ...oldImages,
            {
              img: response.data.secure_url,
              id: response.data.asset_id,
              title: response.data.original_filename,
            },
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setUploading(false);
  };
  const deleteImg = (id: any) => {
    setImages((current: any) => current.filter((img: any) => img.id != id));
  };
  const saveProduct = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      Title: title,
      Price: price,
      Description: description,
      Images: images,
      Categories,
      Colors: colors,
    };
  };
  useEffect(() => {
    if (
      !title ||
      title.length < 1 ||
      !price ||
      price == 0 ||
      !description ||
      description == "" ||
      Categories.length < 1 ||
      !Categories
    ) {
      setMissingData(true);
    } else {
      setMissingData(false);
    }
  }, [title, price, description, images, allCategories]);
  return (
    <div>
      <div className="">
        <form className="space-y-4">
          <div className="grid grid-cols-5 justify-between gap-5">
            <div className="col-span-4">
              <label htmlFor="title">Product name</label>
              <input
                defaultValue={title}
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Product name"
                type="text"
                id="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="price">Price ($)</label>
              <input
                defaultValue={price}
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Price"
                type="number"
                id="price"
                onChange={(e: any) => {
                  setPrice(Number(e.target.value));
                  console.log(typeof price);
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 justify-between gap-5">
            <div className="col-span-4">
              <label htmlFor="description">Description</label>
              <textarea
                defaultValue={description}
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Description"
                rows={5}
                id="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <div>
              <div className="mb-5">
                <label htmlFor="categories">Categories</label>
                <Select
                  placeholder="Categories"
                  value={allCategories.filter((obj: any) =>
                    Categories.includes(obj.label)
                  )} // set selected values
                  options={allCategories}
                  onChange={(e) => {
                    setCategories(
                      Array.isArray(e) ? e.map((x: any) => x.label) : []
                    );
                  }}
                  isMulti
                  isClearable
                  instanceId={5}
                  className=""
                />
              </div>
              <div className="">
                <label htmlFor="categories">Colors</label>
                <Select
                  placeholder="Colors"
                  value={Colors.filter((obj) => colors.includes(obj.label))} // set selected values
                  options={Colors}
                  onChange={(e) => {
                    setColors(Array.isArray(e) ? e.map((x) => x.label) : []);
                  }}
                  isMulti
                  isClearable
                  instanceId={5}
                  className=""
                />
              </div>
            </div>
          </div>
          <h1>Images:</h1>
          <div className="flex gap-5 flex-wrap">
            <ReactSortable
              list={images}
              className="flex flex-wrap gap-5"
              setList={updateImagesOrder}
            >
              {images.map((image: any) => (
                <Card
                  key={image.id}
                  src={image.img}
                  title={image.title}
                  deleteImage={() => {
                    deleteImg(image.id);
                  }}
                />
              ))}
            </ReactSortable>

            {uploadFile.length > 0 &&
              uploading &&
              Array.from(uploadFile).map(() => {
                return (
                  <div className="w-32 h-32">
                    <h1>
                      <Skeleton />
                    </h1>
                  </div>
                );
              })}
            <label htmlFor="files" className="">
              <div
                className={`${
                  uploading ? "cursor-not-allowed" : "cursor-pointer "
                } bg-gray-300 relative rounded-md w-32 h-32 `}
              >
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`"w-6 h-6 mx-auto absolute top-10 -right-[50%] -left-[50%] `}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  {uploadFile.length > 0 ? (
                    <button
                      disabled={uploading}
                      className="bg-blue-700 rounded-b-md text-white absolute bottom-0 w-full text-sm py-2 "
                      onClick={handleUpload}
                    >
                      {uploading
                        ? "Uploading..."
                        : `Upload ${uploadFile.length} image${
                            uploadFile.length == 1 ? "" : "s"
                          }`}
                    </button>
                  ) : (
                    <p className="text-center absolute bottom-0 -right-[50%] -left-[50%]">
                      {images.length > 0 ? "Upload more" : "Upload"}
                    </p>
                  )}
                  <input
                    disabled={uploading}
                    className="hidden"
                    id="files"
                    multiple
                    type="file"
                    title=" "
                    onChange={(event: any) => {
                      setUploadFile(Array.from(event.target.files));
                      console.log(event);
                    }}
                  />
                </div>
              </div>
            </label>
          </div>
        </form>
      </div>
      <div className={`mt-[108px]`}>
        <button
          //   disabled={missingData || loading}
          type="submit"
          className={`rounded-t-lg bg-blue-700 tracking-widest w-24 h-10 font-medium text-white ${
            (missingData || loading) && "cursor-not-allowed"
          }`}
          onClick={action}
        >
          {loading ? (
            <RiseLoader color="#ffffff" size={7} />
          ) : id ? (
            "Update"
          ) : (
            "Add"
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductForm;
