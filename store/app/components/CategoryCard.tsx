"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
type props = {
  category: {
    id: string;
    label: string;
    Image: string;
  };
};
function CategoryCard({ category }: props) {
  return (
    <div className={``}>
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
    </div>
  );
}
export default CategoryCard;
