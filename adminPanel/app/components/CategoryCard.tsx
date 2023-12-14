"use client";
import { useState } from "react";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { deleteCategory } from "../server_actions/categories";
const CategoryCard = ({ category }: { category: Category }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <div className="flex flex-col gap-1 relative border-2 rounded-md   max-w-[10rem] max-h-[12rem]">
      <div className="relative  w-[156px] h-[156px]">
        <Image
          alt={category.label}
          className="object-cover rounded-t-md"
          fill
          src={category.Image}
        />
      </div>
      <p className="font-semibold max-w-[10rem]   overflow-ellipsis whitespace-nowrap overflow-hidden text-center ">
        {category.label}
      </p>
      <p
        className="absolute top-0 left-0 bg-white/70 rounded-br-md border-black font-bold p-1 dark:text-black cursor-default"
        title={category.ProductsIDs.length + " products"}
      >
        {category.ProductsIDs.length}
      </p>
      <Link
        href={{ pathname: "/categories/edit", query: { id: category?.id } }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 absolute top-0 right-0 bg-white/70 dark:text-black cursor-pointer rounded-bl-md"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </Link>

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
            stroke="white"
            className="w-6 h-6 rounded-md cursor-pointer bg-gray-600/70"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          <svg
            onClick={async () => {
              await deleteCategory(category?.id);
              setConfirmDelete(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6 rounded-md cursor-pointer bg-red-500"
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
            setConfirmDelete(true);
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="w-6 h-6 absolute top-8 right-0 cursor-pointer rounded-l-md bg-white/70"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      )}
    </div>
  );
};
export default CategoryCard;
