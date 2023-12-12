"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TfiReload } from "react-icons/tfi";
import { IoIosHeartEmpty } from "react-icons/io";
type Props = {};
const data: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: <LiaShippingFastSolid size={35} />,
    title: "Free Shipping",
    description: "All our products are offered with free shipping in the US.",
  },
  {
    icon: <TfiReload size={35} />,
    title: "14 Days Returns",
    description:
      "You can always return your product within 14 days from your purchase.",
  },
  {
    icon: <IoIosHeartEmpty size={35} />,
    title: "Best Quality Products",
    description:
      "Premium quality products made with the best materials and offers.",
  },
];
const Shipping = (props: Props) => {
  const Section = ({
    icon,
    title,
    description,
  }: {
    title: string;
    description: string;
    icon: ReactNode;
  }) => {
    return (
      <div className="flex flex-col items-center justify-center gap-5">
        <div>{icon}</div>
        <h1 className="font-bold text-2xl">{title}</h1>
        <h3 className=" text-center">{description}</h3>
      </div>
    );
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-5 p-5">
      {data.map((item, i) => {
        return (
          <motion.div
            key={i}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            viewport={{ once: true }}
          >
            <Section {...item} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default Shipping;
