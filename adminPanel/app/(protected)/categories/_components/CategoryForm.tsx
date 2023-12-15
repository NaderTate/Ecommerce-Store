"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { useHandleCategoryData } from "../hooks/useHandleCateogoryData";
import Image from "next/image";

const CategoryForm = ({ category, allCategories }: CategoryFormProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
    <>
      <Button
        className={category ? "" : "w-36"}
        color={category ? "default" : "primary"}
        variant={category ? "light" : "solid"}
        size={category ? "sm" : "lg"}
        onPress={onOpen}
        isIconOnly={category ? false : true}
      >
        {category ? <FaRegEdit size={18} /> : "New"}
      </Button>
      <Modal
        placement="center"
        size="5xl"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">
                  {category ? "Edit" : "New"} Category
                </h1>
              </ModalHeader>
              <ModalBody>
                <form className="space-y-5">
                  <div className="flex flex-col sm:flex-row gap-5">
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
                        setCategoryData({
                          ...categoryData,
                          ParentId: e.target.value,
                        });
                      }}
                    >
                      {allCategories.map(
                        (category: { label: string; id: string }) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.label}
                          </SelectItem>
                        )
                      )}
                      <SelectItem key={""} value={""}>
                        No parent selected
                      </SelectItem>
                    </Select>
                  </div>

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
                  {/* Upload image button */}
                  <label htmlFor="files">
                    <div
                      className={`${
                        uploadingImage
                          ? "cursor-not-allowed"
                          : "cursor-pointer "
                      } bg-gray-300 text-black relative rounded-md w-36 h-12 flex justify-center items-center mt-5`}
                    >
                      <div className="w-full ">
                        <div className="flex gap-1 justify-center items-center">
                          <p className="text-center ">
                            {categoryData.Image &&
                              !uploadingImage &&
                              "Change image"}
                            {!categoryData.Image &&
                              !uploadingImage &&
                              "Upload image"}
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

                  <label className="block">Properties</label>
                  <Button className="block" onPress={addProperty}>
                    Add new property
                  </Button>
                  {categoryData.Properties.map((property, index) => (
                    <Input
                      key={property.name}
                      variant="bordered"
                      defaultValue={property.name}
                      onValueChange={(e) =>
                        handlePropertyNameChange(index, property, e)
                      }
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
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    await onSubmit();
                    onClose();
                  }}
                  isDisabled={missingData || isSubmitting}
                  isLoading={isSubmitting}
                >
                  {category ? "Update" : "Add"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoryForm;
