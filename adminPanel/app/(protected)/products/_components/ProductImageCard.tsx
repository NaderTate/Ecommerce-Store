import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { Image as NUIImage } from "@nextui-org/react";

type Props = { src: string; deleteImage: () => void };

const ProductImageCard = ({ src, deleteImage }: Props) => {
  return (
    <div className="relative border-divider border-2 rounded-lg w-40 aspect-square p-4 flex items-center justify-center ">
      <RxCross2
        onClick={deleteImage}
        className="cursor-pointer absolute top-1 right-1"
      />
      <NUIImage
        as={Image}
        width={300}
        height={300}
        src={src}
        alt={"product image"}
        className="rounded-md object-contain"
      />
    </div>
  );
};

export default ProductImageCard;
