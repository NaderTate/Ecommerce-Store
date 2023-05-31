import axios from "axios";
import React from "react";
import Select from "react-select";
import { useDrag, useDrop } from "react-dnd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RiseLoader from "react-spinners/RiseLoader";
import Skeleton from "./Skeleton";
const Card = ({ src, title, id, index, moveImage, deleteImage }) => {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: "image",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ opacity }} className="relative ">
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

      <img
        src={src}
        alt={title}
        className="rounded-md object-cover w-32 h-32 "
      />
    </div>
  );
};
function ProductForm({
  _id,
  Title,
  Price,
  Description,
  Categories: currentCategories,
  Colors: currentColors,
  Images,
}) {
  const router = useRouter();
  const categories = [
    { value: 1, label: "Mobile" },
    { value: 2, label: "Tables" },
    { value: 3, label: "Home appliances" },
  ];
  const Colors = [
    { value: 1, label: "Red" },
    { value: 2, label: "Green" },
    { value: 3, label: "Black" },
  ];
  const [Categories, setCategories] = useState(currentCategories || []);
  const [colors, setColors] = useState(currentColors || []);
  const [title, setTitle] = useState(Title || null);
  const [price, setPrice] = useState(Price || null);
  const [description, setDescription] = useState(Description || null);
  const [images, setImages] = useState(Images || []);
  const [loading, setLoading] = useState(false);
  const [missingData, setMissingData] = useState(true);
  const [uploading, setUploading] = useState(false);
  const moveImage = React.useCallback((dragIndex, hoverIndex) => {
    setImages((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];
      clonedCards.splice(hoverIndex, 0, removedItem);
      return clonedCards;
    });
  }, []);
  const [uploadFile, setUploadFile] = useState([]);
  const handleUpload = async (e) => {
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
              (file) =>
                file.name.split(".")[0] != response.data.original_filename
            )
          );

          console.log(response);
          setImages((oldImages) => [
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
  const deleteImg = (id) => {
    setImages((current) => current.filter((img) => img.id != id));
  };
  const saveProduct = async (e) => {
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
    if (_id) {
      // update
      const req = await axios.put("/api/product/", { ...data, _id });
      if (req.data.success) {
        setLoading(false);
        router.push("/products");
      }
    } else {
      // create
      const req = await axios.post("/api/product/", data);
      if (req.data.success) {
        setLoading(false);
        router.push("/products");
      }
    }
  };
  useEffect(() => {
    if (
      !title ||
      title.length < 1 ||
      !price ||
      price.length < 1 ||
      !description ||
      description.length < 1 ||
      Categories.length < 1 ||
      !Categories
    ) {
      setMissingData(true);
    } else {
      setMissingData(false);
    }
  }, [title, price, description, images, categories]);
  return (
    <div>
      <div className="">
        <form onSubmit={saveProduct} className="space-y-4">
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
                onChange={(e) => {
                  setPrice(e.target.value);
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
                rows="5"
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
                  value={categories.filter((obj) =>
                    Categories.includes(obj.label)
                  )} // set selected values
                  options={categories}
                  onChange={(e) => {
                    setCategories(
                      Array.isArray(e) ? e.map((x) => x.label) : []
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
          <div className="flex gap-5">
            <h1>Images:</h1>
          </div>
        </form>
      </div>
      <div className="flex gap-5 flex-wrap">
        {React.Children.toArray(
          images.map((image, index) => (
            <Card
              src={image.img}
              title={image.title}
              id={image.id}
              index={index}
              moveImage={moveImage}
              deleteImage={() => {
                deleteImg(image.id);
              }}
            />
          ))
        )}

        {uploadFile.length > 0 &&
          uploading &&
          Array.from(uploadFile).map((item) => {
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
                onChange={(event) => {
                  setUploadFile(Array.from(event.target.files));
                  console.log(event);
                }}
              />
            </div>
          </div>
        </label>
      </div>
      <div className={`mt-[108px]`}>
        <button
          disabled={missingData || loading}
          type="submit"
          className={`rounded-t-lg bg-blue-700 tracking-widest w-24 h-10 font-medium text-white ${
            (missingData || loading) && "cursor-not-allowed"
          }`}
          onClick={saveProduct}
        >
          {loading ? (
            <RiseLoader color="#ffffff" size={7} />
          ) : _id ? (
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
