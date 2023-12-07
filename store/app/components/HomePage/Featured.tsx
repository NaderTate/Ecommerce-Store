"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
function Featured() {
  return (
    <div className="h-screen bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] flex flex-col justify-evenly">
      {/* mobile view */}
      <div className="sm:hidden h-screen relative">
        <motion.div
          initial={{ opacity: 0, x: 200, y: -200, rotate: 30 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          transition={{ duration: 2 }}
        >
          <Image
            priority
            src={"/assets/images/mobile_macbook.webp"}
            width={1920}
            height={1080}
            quality={100}
            className="object-contain w-96 absolute top-10 -right-[170px] rotate-[30deg] "
            alt="macbook"
          />
        </motion.div>

        <motion.div
          initial={{ rotate: 30, y: 200, x: -300 }}
          animate={{ rotate: 0, y: 170, x: -170 }}
          transition={{ duration: 2 }}
        >
          <Image
            priority
            src={"/assets/images/mobile_macbook.webp"}
            width={1920}
            height={1080}
            quality={100}
            className="object-contain w-96 absolute  -rotate-[30deg] transform -scale-x-100"
            alt="macbook"
          />
        </motion.div>
      </div>

      {/* tablet / pc view */}
      <div className="hidden sm:flex flex-col justify-evenly h-screen">
        <motion.div
          className=" m-auto"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            priority
            src="/assets/images/macbook.webp"
            width={1920}
            height={1080}
            quality={100}
            className=" object-contain w-[95vw]"
            alt="macbook"
          />
        </motion.div>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="font-bold text-2xl text-center text-black"
      >
        Mover.Maker. <br />
        Boundary Breaker.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="underline text-center font-bold mb-5 text-black"
      >
        <Link href={{ pathname: "/products/64a72be82adc64d87b3512eb" }}>
          Shop Now
        </Link>
      </motion.p>
    </div>
  );
}

export default Featured;
