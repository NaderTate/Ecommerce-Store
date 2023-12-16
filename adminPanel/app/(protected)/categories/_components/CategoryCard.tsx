"use client";
import Image from "next/image";
import CategoryForm from "./CategoryForm";
import ConfirmDelete from "../../../components/ConfirmDeletePopup";
import { Image as NUIImage } from "@nextui-org/react";
import { deleteCategory } from "@/app/server_actions/categories";
import { CategoryFormProps } from "@/typings";
const CategoryCard = ({ category, allCategories }: CategoryFormProps) => {
  return (
    <div className=" border-divider border-2 rounded-md p-2 pt-0">
      <div className="flex justify-end">
        <CategoryForm category={category} allCategories={allCategories} />
        <ConfirmDelete
          id={category?.id as string}
          deleteAction={deleteCategory}
        />
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
