"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
type Props = {
  img: string;
  title: string;
  description: string;
  id: string;
  CTA: string;
};

const CategorySection = ({ img, title, description, id, CTA }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-10 m-5">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Image
          src={img}
          width={500}
          height={500}
          alt={title}
          className="m-auto"
        />
      </motion.div>
      <div className="space-y-5 text-center sm:text-left">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="font-bold text-6xl"
        >
          {title}
        </motion.h1>
        <motion.h3
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-xl"
        >
          {description}
        </motion.h3>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button
            className="bg-black text-white dark:bg-white dark:text-black px-7"
            radius="sm"
            as={Link}
            href={`/categories/${id}`}
          >
            {CTA}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CategorySection;
