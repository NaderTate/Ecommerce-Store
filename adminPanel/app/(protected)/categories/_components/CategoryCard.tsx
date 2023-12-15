"use client";
import Image from "next/image";
import CategoryForm from "./CategoryForm";
import ConfirmDelete from "./ConfirmDeletePopup";
import { Image as NUIImage } from "@nextui-org/react";
const CategoryCard = ({ category, allCategories }: CategoryFormProps) => {
  return (
    <div className=" border-divider border-2 rounded-md p-2 pt-0">
      <div className="flex justify-end">
        <ConfirmDelete categoryId={category?.id as string} />
        <CategoryForm category={category} allCategories={allCategories} />
      </div>
      <NUIImage
        as={Image}
        width={160}
        height={160}
        alt={category?.label || "Category"}
        className="object-contain rounded-md"
        src={category?.Image as string}
      />
      <h5 className="font-semibold line-clamp-1">{category?.label}</h5>
      <h6 className="text-xs line-clamp-1">
        {category?.ProductsIDs?.length} products
      </h6>
    </div>
  );
};
export default CategoryCard;
