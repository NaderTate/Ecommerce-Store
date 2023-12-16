"use client";
import Image from "next/image";
import { deleteAdmin } from "../../../server_actions/admins";
import ConfirmDelete from "@/app/components/ConfirmDeletePopup";
import AdminForm from "./AdminForm";
type Props = {
  admin: {
    id: string;
    Name: string;
    Email: string;
    Image: string | null;
  };
};
const ProductCard = ({ admin }: Props) => {
  return (
    <>
      <div className="flex gap-3 relative border-2 border-divider pr-1 rounded-md w-[19rem]  ">
        <Image
          width={75}
          height={75}
          alt={admin.Name}
          src={
            admin.Image ??
            "https://upload.wikimedia.org/wikipedia/commons/9/9e/Placeholder_Person.jpg"
          }
          className="object-contain rounded-l-md"
        />
        <div>
          <p className="mt-1  font-semibold  max-w-[11rem] overflow-ellipsis whitespace-nowrap overflow-hidden ">
            {admin?.Name}
          </p>

          <p className="description text-sm  max-w-[11rem] overflow-ellipsis whitespace-nowrap overflow-hidden ">
            {admin?.Email}
          </p>
        </div>
        <div className="absolute bottom-1 right-8">
          <AdminForm admin={admin} />
        </div>
        <div className="absolute bottom-1 right-1">
          <ConfirmDelete id={admin.id} deleteAction={deleteAdmin} />
        </div>
      </div>
    </>
  );
};

export default ProductCard;
