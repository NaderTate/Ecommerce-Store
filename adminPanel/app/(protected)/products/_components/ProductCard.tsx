import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import { deleteProduct } from "../../../server_actions/products";
import ConfirmDelete from "@/app/components/ConfirmDeletePopup";
import { FaRegEdit } from "react-icons/fa";
import { Button } from "@nextui-org/react";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex gap-3 relative border-2 border-divider pr-1 rounded-md max-w-[19rem] p-2  ">
      <Image
        width={70}
        height={70}
        alt={product.Title}
        src={product.mainImg}
        className="object-contain rounded-l-md"
      />

      <div>
        <h4 className="font-semibold  max-w-[11rem] overflow-ellipsis whitespace-nowrap overflow-hidden ">
          {product?.Title}
        </h4>
        <p className="description text-sm  max-w-[11rem] overflow-ellipsis whitespace-nowrap overflow-hidden ">
          {product?.Description}
        </p>
        <span className="absolute bottom-1 font-bold">{product?.Price}$</span>
      </div>

      <Button
        className="absolute bottom-1 right-1"
        isIconOnly
        size="sm"
        variant="light"
        as={Link}
        href={`/products/edit?id=${product.id}`}
      >
        <FaRegEdit size={18} />
      </Button>
      <div className="absolute bottom-1 right-10">
        <ConfirmDelete id={product.id} deleteAction={deleteProduct} />
      </div>
    </div>
  );
};

export default ProductCard;
