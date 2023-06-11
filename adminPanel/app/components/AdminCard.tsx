"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Admin } from "@prisma/client";
import { deleteAdminAction } from "../_actions";
const ProductCard = ({ admin }: { admin: Admin }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  return (
    <div>
      <div className="flex gap-3 relative border-2 pr-1 rounded-md w-[19rem]  ">
        <div className="relative  min-w-[6rem] min-h-[6rem]">
          <Image
            alt={admin.name}
            src={
              admin.image == ""
                ? "https://upload.wikimedia.org/wikipedia/commons/9/9e/Placeholder_Person.jpg"
                : admin.image
            }
            fill
            className="object-cover rounded-l-md"
          />
        </div>

        <div>
          <p className="mt-1  font-semibold  max-w-[11rem] overflow-ellipsis whitespace-nowrap overflow-hidden ">
            {admin?.name}
          </p>

          <p className="description text-sm  max-w-[11rem] overflow-ellipsis whitespace-nowrap overflow-hidden ">
            {admin?.email}
          </p>
        </div>

        {confirmDelete ? (
          <div className="flex absolute bottom-1 right-1 gap-3">
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
                await deleteAdminAction(admin?.id);
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
            className="w-6 h-6 absolute bottom-1 right-1 cursor-pointer"
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
