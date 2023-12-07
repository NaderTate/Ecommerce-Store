"use client";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
type Props = {};

const ShoesSection = (props: Props) => {
  return (
    <div>
      <div className='bg-[url("https://res.cloudinary.com/dqkyatgoy/image/upload/v1701364279/shoes_1d3c4eb8-d243-4469-84a5-5e59982bc64b_msc6ul.jpg")] bg-cover bg-bottom bg-no-repeat h-screen p-20 w-full flex flex-col justify-center items-center'>
        <div className="space-y-5">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-white text-6xl text-center font-bold"
          >
            Shoes
          </motion.h1>
          <motion.h4
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-white text-center text-xl"
          >
            Style is a never ending research, <br /> it's hard work where hands
            need to get dirty.
          </motion.h4>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex gap-5 justify-center"
          >
            <Button className="bg-white text-black" radius="sm">
              Shop Men
            </Button>
            <Button className="bg-white text-black" radius="sm">
              Shop Women
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ShoesSection;
