"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type props = {
  category: {
    id: string;
    label: string;
    Image: string;
  };
};

function CategoryCard({ category }: props) {
  return (
    <>
      <Link href={{ pathname: `/categories/${category.id}` }}>
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Image
            width={500}
            height={500}
            src={category.Image}
            className="object-contain rounded-md "
            alt={category.label}
          />
        </motion.div>
      </Link>
      <p className={`line-clamp-1 text-xs`}>{category.label}</p>
    </>
  );
}
export default CategoryCard;
