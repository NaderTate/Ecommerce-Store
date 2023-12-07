import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";
import { PiMaskHappyFill } from "react-icons/pi";
import StarRating from "../components/ProductPage/StarRating";
import Image from "next/image";
async function page({ searchParams }: { searchParams: any }) {
  const orderID = searchParams.orderID;
  const orderDetails = await prisma.order.findUnique({
    where: { id: orderID },
    include: { User: { select: { Name: true } }, Product: true },
  });
  return (
    <div className="p-5 sm:p-10">
      <div className="bg-[#001D3D] rounded-md p-5 sm:p-10 text-center">
        <div className="border-2 border-white rounded-md  border-dashed p-5 sm:p-10 space-y-5">
          <div className="font-bold text-2xl sm:text-5xl">
            <span className="text-[#FFC300]">30% OFF</span>{" "}
            <span className="text-white">ON YOUR NEXT ORDER</span>
          </div>
          <div className="text-xl sm:text-4xl text-white">
            We know the world is full of choices. Thank you for choosing us!
            <br /> Here&apos;s a 30% off for your next order!
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 text-2xl sm:text-4xl font-bold ">
            <div className="bg-white text-[#003566] py-2">RPG2023</div>
            <Link href={{ pathname: "/" }}>
              <div className="bg-[#FFC300] text-[#000814] tracking-wider py-2">
                SHOP
              </div>
            </Link>
          </div>
        </div>
      </div>
      <h1 className="text-5xl font-bold tracking-wider text-center my-10">
        THANK YOU!
      </h1>
      <PiMaskHappyFill size={200} className="m-auto" />
      <div className="bg-[#003566] text-white p-5 sm:p-10 text-2xl sm:text-4xl tracking-wider rounded-md mt-10">
        <p>
          Hi {orderDetails?.User.Name}, <br /> <br /> We received your order and
          we&apos;ll notify you as soon as it gets shipped out!
        </p>
        <Link href={{ pathname: "/account", query: { content: "orders" } }}>
          <button className="bg-[#ffc300] text-2xl rounded-full text-[#000814] block font-bold m-auto px-6 py-5 mt-10">
            VIEW ORDER STATUS
          </button>
        </Link>
      </div>
      <hr className="my-10" />
      <div className="space-y-5">
        {orderDetails?.Product.map(({ mainImg, Title, Price, id, Rating }) => {
          const quantity: any = orderDetails.Orders.find(
            (order: any) => order.id == id
          );
          return (
            <div key={id} className="pr-5 md:pr-24 lg:pr-96 block h-36">
              <Link href={{ pathname: `/products/${id}` }}>
                <div className="">
                  <div className="float-left mr-5 bg-white rounded-md">
                    <Image
                      width={144}
                      height={144}
                      src={mainImg}
                      alt={Title}
                      className="object-contain"
                    />
                    <span className="absolute top-0 right-0 bg-black/70 rounded-bl-md text-white p-[2px]">
                      {quantity.quantity}
                    </span>
                  </div>
                  <div className="space-y-1 grow">
                    <p className=" line-clamp-2 "> {Title}</p>
                    <StarRating rating={Rating} hideNumber />
                    <span className="font-bold">${Price}</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;
