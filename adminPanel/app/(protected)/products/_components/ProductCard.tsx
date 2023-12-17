import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";

import ConfirmDelete from "@/components/ConfirmDeletePopup";
import { deleteProduct } from "@/app/server_actions/products";

import { FaRegEdit } from "react-icons/fa";

import { currencySymbol } from "@/lib/global_variables";

type Props = {
  product: {
    id: string;
    Price: number;
    Title: string;
    mainImg: string;
    Description: string;
  };
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="flex gap-3 relative border-2 border-divider pr-1 rounded-md w-80 p-2  ">
      <Image
        width={70}
        height={70}
        alt={product.Title}
        src={product.mainImg}
        className="object-contain rounded-md"
      />
      <div>
        <h4 className="font-semibold line-clamp-1">{product?.Title}</h4>
        <p className="text-sm line-clamp-1 text-default-500">
          {product?.Description}
        </p>
        <span className="absolute bottom-1 font-bold">
          {currencySymbol + product?.Price}
        </span>
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
