"use client";
import Select from "react-select";
import Dropzone from "@/components/Dropzone";
import { ReactSortable } from "react-sortablejs";
import { Button, Input, Spacer, Spinner, Textarea } from "@nextui-org/react";

import { colors } from "../colors";
import ProductImageCard from "./ProductImageCard";
import { useHandleProductData } from "../_hooks/useHandleProductData";

import { ProductFormProps } from "@/typings";

function ProductForm({ product, allCategories }: ProductFormProps) {
  const {
    productData,
    setProductData,
    productCategoriesProperties,
    submitting,
    isMissingData,
    onSubmit,
    handleUploadImages,
    handleProductProperty,
    deleteImg,
    uploadingImages,
  } = useHandleProductData(allCategories, { ...product });

  return (
    <form className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-5 justify-between gap-5">
        <Input
          className="md:col-span-3"
          variant="bordered"
          defaultValue={productData.Title}
          label="Product name"
          onValueChange={(e) => {
            setProductData({ ...productData, Title: e });
          }}
        />

        <Input
          className="md:col-span-2"
          variant="bordered"
          defaultValue={String(productData.Price)}
          label="Price"
          type="number"
          min={1}
          onValueChange={(e) => {
            setProductData({ ...productData, Price: Number(e) });
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 justify-between gap-5">
        <Textarea
          className="md:col-span-3"
          variant="bordered"
          defaultValue={productData.Description}
          label="Description"
          minRows={5}
          maxRows={5}
          onValueChange={(e) => {
            setProductData({ ...productData, Description: e });
          }}
        />
        <div className="md:col-span-2">
          <Select
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: "transparent",
                borderRadius: "0.65rem",
                padding: "0.5rem",
                color: "black",
              }),
              // chnage backround color of dropdown list
              menu: (base) => ({
                ...base,
                backgroundColor: "#3f3f46",
              }),
              // remove the hover effect
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? "#1f2937" : "#3f3f46",
                color: "white",
              }),
            }}
            placeholder="Categories"
            value={allCategories.filter((obj: { id: string }) =>
              productData.CategoryIDs.includes(obj.id)
            )} // set selected values
            options={allCategories}
            onChange={(e) => {
              setProductData({
                ...productData,
                CategoryIDs: Array.isArray(e) ? e.map((x) => x.id) : [],
              });
            }}
            isMulti
            isClearable
            instanceId={5}
          />
          <Spacer y={4} />
          <Select
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: "transparent",
                borderRadius: "0.65rem",
                padding: "0.5rem",
                color: "black",
              }),
              // chnage backround color of dropdown list
              menu: (base) => ({
                ...base,
                backgroundColor: "#3f3f46",
              }),
              // remove the hover effect
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? "#1f2937" : "#3f3f46",
                color: "white",
              }),
            }}
            placeholder="Colors"
            value={colors.filter((color) =>
              productData.Colors.includes(color.label)
            )} // set selected values
            options={colors}
            onChange={(e) => {
              setProductData({
                ...productData,
                Colors: Array.isArray(e) ? e.map((x) => x.label) : [],
              });
            }}
            isMulti
            isClearable
            instanceId={5}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {productCategoriesProperties.map((property) => {
          return (
            <Input
              key={property.name}
              variant="bordered"
              onValueChange={(e) => {
                handleProductProperty(property.name, e);
              }}
              defaultValue={
                product?.Properties.find(
                  (prop: { name: string }) => prop.name == property.name
                )?.value
              }
              label={property.name}
            />
          );
        })}
      </div>
      <h4>Images:</h4>
      <Dropzone
        handleUploadImages={handleUploadImages}
        className="p-16 mt-5 border-divider border-2 rounded-md cursor-pointer"
      />
      {uploadingImages && <Spinner className="flex justify-center" />}
      <ReactSortable
        list={productData.Images}
        className="flex flex-wrap gap-5 justify-center mx-2"
        setList={
          (newState) =>
            setProductData({
              ...productData,
              Images: newState,
            }) // set the new state of the images array
        }
      >
        {productData.Images.map((image) => (
          <ProductImageCard
            key={image.id}
            src={image.img}
            deleteImage={() => {
              deleteImg(image.id);
            }}
          />
        ))}
      </ReactSortable>

      <Button
        color="primary"
        size="lg"
        className="mt-20"
        isDisabled={isMissingData || submitting}
        isLoading={submitting}
        type="submit"
        onPress={onSubmit}
      >
        {product ? "Update" : "Add"}
      </Button>
    </form>
  );
}
export default ProductForm;
