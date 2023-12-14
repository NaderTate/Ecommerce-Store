"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import { deleteProduct } from "../server_actions/products";

const ProductCard = ({ product }: { product: Product }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  return (
    <div>
      <div className="flex gap-3 relative border-2 pr-1 rounded-md max-w-[19rem]  ">
        <Image
          width={100}
          height={100}
          alt={product.Title}
          src={product.mainImg}
          className="object-contain rounded-l-md"
        />

        <div>
          <p className="font-semibold  max-w-[11rem] overflow-ellipsis whitespace-nowrap overflow-hidden ">
            {product?.Title}
          </p>
          <p className="description text-sm  max-w-[11rem] overflow-ellipsis whitespace-nowrap overflow-hidden ">
            {product?.Description}
          </p>
          <p className="absolute bottom-1 font-bold">{product?.Price}$</p>
        </div>

        <Link
          href={{ pathname: "/products/edit", query: { id: product?.id } }}

          // href={`/products/edit?id=${product?.id}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 absolute right-1 bottom-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </Link>
        {confirmDelete ? (
          <div className="flex absolute bottom-1 right-8 gap-3">
            <div
              onClick={() => {
                setConfirmDelete(false);
              }}
              className="bg-gray-700 text-white px-3 py-1 rounded-md cursor-pointer"
            >
              Cancel
            </div>

            <div
              onClick={async () => {
                setDeleting(true);
                await deleteProduct(product.id);
                setDeleting(false);
                setConfirmDelete(false);
              }}
              className="bg-red-700 text-white px-3 py-1 rounded-md cursor-pointer"
            >
              {deleting ? "Deleting..." : "Delete"}
            </div>
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
            className="w-6 h-6 absolute bottom-1 right-8 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
