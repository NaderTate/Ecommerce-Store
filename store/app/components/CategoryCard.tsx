import Link from "next/link";
import React from "react";
import { Category } from "@prisma/client";
import Image from "next/image";
function CategoryCard({
  category,
  width,
  height,
}: {
  category: Category;
  width: string;
  height: string;
}) {
  return (
    <div className={`${width}`}>
      <Link href={{ pathname: `/categories/${category.id}` }}>
        <div className={`relative ${width} ${height}`}>
          <Image
            fill
            src={category.Image}
            className="object-cover rounded-md "
            alt={category.label}
          />
        </div>
      </Link>
      <p
        className={`overflow-ellipsis whitespace-nowrap overflow-hidden text-xs`}
      >
        {category.label}
      </p>
    </div>
  );
}
export default CategoryCard;
