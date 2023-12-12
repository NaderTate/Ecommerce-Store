import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PiMaskHappyFill } from "react-icons/pi";
import ProductsCarousel from "../components/ProductsCarousel";
import { Divider } from "@nextui-org/react";
type Props = {
  searchParams: { orderID: string };
};
async function page({ searchParams }: Props) {
  const orderID = searchParams.orderID;
  const orderDetails = await prisma.order.findUnique({
    where: { id: orderID },
    select: {
      User: { select: { Name: true } },
      Products: {
        select: {
          Product: {
            select: {
              id: true,
              Title: true,
              Price: true,
              mainImg: true,
              secondImage: true,
            },
          },
        },
      },
    },
  });
  return (
    <div className="px-5 sm:px-10 mt-20">
      <div className="bg-[#001D3D] rounded-md p-5 sm:p-10 text-center">
        <div className="border-2 border-white rounded-md  border-dashed p-5 sm:p-10 space-y-5">
          <div className="font-bold text-2xl sm:text-5xl">
            <span className="text-[#FFC300]">30% OFF</span>{" "}
            <span className="text-white">ON YOUR NEXT ORDER</span>
          </div>
          <div className="text-xl sm:text-4xl text-white">
            The world is full of choices. Thank you for choosing us!
            <br /> Here&apos;s a 30% off for your next order!
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 text-2xl sm:text-4xl font-bold ">
            <div className="bg-white text-[#003566] py-2">RPG2024</div>
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
      <Divider className="my-10" />
      {orderDetails?.Products && (
        <ProductsCarousel
          data={orderDetails?.Products.map((product) => {
            return {
              ...product.Product,
            };
          })}
        />
      )}
    </div>
  );
}

export default page;
