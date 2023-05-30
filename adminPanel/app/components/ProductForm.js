import axios from "axios";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RiseLoader from "react-spinners/RiseLoader";
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
      categories.length < 1
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
            <h1>Upload images:</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>
          <div className="fixed bottom-0">
            <button
              disabled={missingData || loading}
              type="submit"
              className={`"  rounded-t-lg bg-blue-700 tracking-widest w-24 h-10 font-medium text-white ${
                (missingData || loading) && "cursor-not-allowed"
              }`}
              onClick={() => {
                saveProduct;
              }}
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
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
