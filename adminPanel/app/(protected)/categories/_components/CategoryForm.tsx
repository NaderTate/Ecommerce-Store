"use client";
import Image from "next/image";
import { useHandleCategoryData } from "../hooks/useHandleCateogoryData";
import { Button, Input, Skeleton, Select, SelectItem } from "@nextui-org/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
function CategoryForm({ category, allCategories }: CategoryFormProps) {
  const {
    categoryData,
    setCategoryData,
    isSubmitting,
    missingData,
    addProperty,
    handlePropertyNameChange,
    removeProperty,
    uploadingImage,
    onSubmit,
    handleUploadImage,
  } = useHandleCategoryData({ ...category });
  return (
    <form className="flex gap-3 lg:items-end flex-col lg:flex-row items-start">
      <Input
        variant="bordered"
        label="Category name"
        defaultValue={categoryData.label}
        onValueChange={(e) => {
          setCategoryData({ ...categoryData, label: e });
        }}
      />
      <Select
        variant="bordered"
        label="Select a parent"
        selectedKeys={[categoryData.ParentId || ""]}
        onChange={(e) => {
          setCategoryData({ ...categoryData, ParentId: e.target.value });
        }}
      >
        {allCategories.map((category: { label: string; id: string }) => (
          <SelectItem key={category.id} value={category.id}>
            {category.label}
          </SelectItem>
        ))}
        <SelectItem key={""} value={""}>
          No parent selected
        </SelectItem>
      </Select>

      {/* Upload image button */}
      <label htmlFor="files" className="">
        <div
          className={`${
            uploadingImage ? "cursor-not-allowed" : "cursor-pointer "
          } bg-gray-300 text-black relative rounded-md w-36 h-12 flex justify-center items-center`}
        >
          <div className="w-full ">
            <div className="flex gap-1 justify-center items-center">
              <p className="text-center ">
                {categoryData.Image && !uploadingImage && "Change image"}
                {!categoryData.Image && !uploadingImage && "Upload image"}
              </p>
              <LuUpload />
            </div>
            <input
              accept="image/*"
              disabled={uploadingImage}
              className="hidden"
              id="files"
              type="file"
              onChange={handleUploadImage}
            />
          </div>
        </div>
      </label>
      {categoryData.Image && (
        <Image
          alt="Image"
          width={128}
          height={128}
          src={categoryData.Image}
          className="rounded-md object-contain"
        />
      )}
      {uploadingImage && (
        <Skeleton
          disableAnimation
          className="h-20 w-28 flex-shrink-0 rounded-md"
        />
      )}
      <label className="block">Properties</label>
      <Button onPress={addProperty}>Add new property</Button>
      {categoryData.Properties.map((property, index) => (
        <Input
          key={property.name}
          variant="bordered"
          defaultValue={property.name}
          onValueChange={(e) => handlePropertyNameChange(index, property, e)}
          label="property name"
          placeholder="eg: Weight"
          endContent={
            <FaRegTrashAlt
              className="cursor-pointer"
              onClick={() => removeProperty(index)}
              fill="#ff4f4f"
            />
          }
          className="my-2"
        />
      ))}
      <Button
        color="primary"
        onPress={onSubmit}
        isDisabled={missingData || isSubmitting}
        isLoading={isSubmitting}
      >
        {category ? "Update" : "Add"}
      </Button>
    </form>
  );
}

export default CategoryForm;
