"use client";
import axios from "axios";
import React from "react";
import Select from "react-select";
import { useEffect, useState, useTransition } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import Skeleton from "./Skeleton";
import { ReactSortable } from "react-sortablejs";
import PropTypes, { InferProps } from "prop-types";
import { createProductAction, updateProductAction } from "@/app/_actions";
import Dropzone from "./Dropzone";
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
  allCategories: PropTypes.any,
  Colors: PropTypes.array,
  Images: PropTypes.array,
  Properties: PropTypes.any,
};
function ProductForm({
  id,
  Title,
  Price,
  Description,
  Categories: currentCategories,
  allCategories,
  Colors: currentColors,
  Properties: assignedProperties,
  Images,
}: InferProps<typeof ProductForm.propTypes>) {
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
  const [properties, setProperties]: any = useState([]);
  const [isPending, startTransition] = useTransition();
  const [productProperty, setProductProperty]: any = useState(
    assignedProperties || {}
  );
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
            images[0].img,
            description,
            [{ title: "Rev1" }],
            Categories,
            colors,
            productProperty
          )
      );
      setLoading(false);
      // window.location.href = "/products";
    } else {
      setLoading(true);
      await createProductAction(
        title,
        price,
        images,
        images[0].img,
        description,
        [{ title: "Rev1" }],
        Categories,
        colors,
        productProperty
      );
      setLoading(false);
      // window.location.href = "/products";
    }
  }

  function updateImagesOrder(images: any) {
    setImages(images);
  }
  const deleteImg = (id: any) => {
    setImages((current: any) => current.filter((img: any) => img.id != id));
  };
  useEffect(() => {
    if (
      !title ||
      title.length < 1 ||
      !price ||
      price == 0 ||
      !description ||
      description == "" ||
      !images ||
      images.length < 1 ||
      Categories.length < 1 ||
      !Categories
    ) {
      setMissingData(true);
    } else {
      setMissingData(false);
    }
  }, [title, price, description, images]);
  useEffect(() => {
    if (Categories.length > 0) {
      const props: Array<any> = [];
      Categories.map((cat) => {
        props.push(allCategories.find(({ label }: any) => label == cat));
        setProperties(props);
      });
      const propductProps: any = {};
      props.map((prop) => {
        if (prop.Properties.length > 0) {
          return prop.Properties.map((prop: any) => {
            propductProps[prop.name] = "";
            setProductProperty(propductProps);
          });
        }
      });
    } else {
      setProperties([]);
      setProductProperty({});
    }
  }, [Categories]);
  const handleProductProperty = (name: string, value: string) => {
    setProductProperty((prev: any) => {
      const newProductProps: any = { ...prev };
      newProductProps[name] = value;
      return newProductProps;
    });
  };
  return (
    <div>
      <div>
        <form className="space-y-4">
          <div className="md:grid grid-cols-5 justify-between gap-5">
            <div className="col-span-3">
              <label htmlFor="title">Product name</label>
              <input
                defaultValue={title}
                className="w-full rounded-lg dark:border-0 border-gray-200 border-2 p-3 text-sm"
                placeholder="Product name"
                type="text"
                id="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="price">Price ($)</label>
              <input
                defaultValue={price}
                className="w-full rounded-lg border-gray-200 p-3 text-sm dark:border-0 border-2"
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
          <div className="md:grid grid-cols-5 justify-between gap-5">
            <div className="col-span-3">
              <label htmlFor="description">Description</label>
              <textarea
                defaultValue={description}
                className="w-full rounded-lg border-gray-200 p-3 text-sm  dark:border-0 border-2"
                placeholder="Description"
                rows={5}
                id="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="col-span-2">
              <div className="mb-5">
                <label htmlFor="categories">Categories</label>
                <div className="text-black">
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
                  />
                </div>
              </div>
              <div>
                <label htmlFor="categories">Colors</label>
                <div className="text-black">
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
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {properties.length > 0 &&
              properties.map((prop: any) => {
                return prop.Properties.map((property: any) => {
                  return (
                    <>
                      <h1 key={property.name}>{property.name}</h1>
                      <select
                        className="rounded-md border-gray-200  dark:border-0 border-2"
                        value={productProperty[property.name] || ""}
                        onChange={(e: any) => {
                          handleProductProperty(property.name, e.target.value);
                        }}
                      >
                        <option value="">Select value:</option>
                        {property.values.split(",")?.map((v: string) => {
                          return (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          );
                        })}
                      </select>
                    </>
                  );
                });
              })}
          </div>

          <h1>Images:</h1>
          <Dropzone
            handleImages={async (x: any) => {
              setUploadFile(x);
              setUploading(true);
              for (let i = 0; i < x.length; i++) {
                const formData = new FormData();
                formData.append("file", x[i]);
                formData.append("upload_preset", "etttajb9");
                await axios
                  .post(process.env.CLOUDINARY_URL || "", formData)
                  .then((response) => {
                    setUploadFile((current) =>
                      current.filter(
                        (file: any) =>
                          file.name.split(".")[0] !=
                          response.data.original_filename
                      )
                    );
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
            }}
            className="p-16 mt-5 border rounded-md border-neutral-200"
          />
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
              Array.from(uploadFile).map(({ id }) => {
                return <Skeleton key={id} width="w-32" height="h-32" />;
              })}

            {/* <label htmlFor="files">
              <div
                className={`${
                  uploading ? "cursor-not-allowed" : "cursor-pointer "
                } bg-gray-300 relative rounded-md w-32 h-32 `}
              >
                <div className="text-black">
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
                    onChange={(event: any) => {
                      setUploadFile(Array.from(event.target.files));
                      console.log(event);
                    }}
                  />
                </div>
              </div>
            </label> */}
          </div>
        </form>
      </div>
      <div className={`mt-[108px]`}>
        <button
          disabled={missingData || loading}
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
