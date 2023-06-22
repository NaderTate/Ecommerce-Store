import { prisma } from "@/lib/prisma";
import { Category, Product } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
const Card = (product: Product) => {
  return (
    <div>
      <div className="flex md:flex-col flex-row md:w-56 gap-2">
        <Link href={{ pathname: `/products/${product.id}` }}>
          <div className="relative w-24 h-24  md:w-56 md:h-56">
            <Image
              fill
              className="object-cover"
              src={product.mainImg}
              alt={product.Title}
            />
          </div>
        </Link>
        <div>
          <p className="max-h-[75px] overflow-hidden">{product.Title}</p>${" "}
          <span className="text-xl font-bold">{product.Price}</span>
        </div>
      </div>
    </div>
  );
};
const starReviews: Array<string> = [
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687294114/Nader%20Express/4s_jotbbt.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687294115/Nader%20Express/3s_fa6fvk.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687294114/Nader%20Express/2s_bsbrgl.svg",
  "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687293658/Nader%20Express/Frame_1_utki4s.svg",
];
const Divider = () => {
  return (
    <hr className="border border-t border-[#030711] w-full dark:border-white/70 my-1" />
  );
};
async function page({
  params: { category },
  searchParams,
}: {
  params: { category: string };
  searchParams: any;
}) {
  const sk = searchParams.page || 1;
  const itemsToShow = 30;
  const min = Number(searchParams.min) || 0;
  const max = Number(searchParams.max) || 9999999;
  const sort = searchParams.sort || "id";

  const products = await prisma.product.findMany({
    where: {
      Categories: { hasSome: category.replace(/%20/g, " ") },
      AND: [{ Price: { gt: min } }, { Price: { lt: max } }],
    },
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
    orderBy: [
      sort == "id"
        ? {
            id: "desc",
          }
        : sort == "PA"
        ? {
            Price: "asc",
          }
        : {
            Price: "desc",
          },
    ],
  });

  const allProducts = await prisma.product.findMany({
    where: { Categories: { hasSome: category.replace(/%20/g, " ") } },
    orderBy: [{ Price: "desc" }],
  });
  const highestPrice: any = allProducts.at(0)?.Price;
  const lowestPrice: any = allProducts.at(-1)?.Price;
  const difference: number = Math.floor(highestPrice - lowestPrice);
  const segment = Math.floor(difference / 5);
  const firstPrice = Math.ceil(lowestPrice + segment);
  const secondPrice = Math.floor(segment * 2);
  const thirdPrice = Math.floor(segment * 3);
  const fourthPrice = Math.floor(segment * 4);
  const count = allProducts.length;
  const pages = Array.from(
    { length: Math.ceil(count / itemsToShow) },
    (_, i) => i + 1
  );
  const pagenateArr = (arr: Array<number>, p: number) => {
    let newArr: Array<number> = [];
    arr.forEach((element: any) => {
      if (Math.abs(element - p) <= 2) {
        newArr = [...newArr, element];
      }
    });
    return newArr;
  };
  const Arr = pagenateArr(pages, sk);
  let similarCategories: Array<Category> = [];
  const categoryInfo = await prisma.category.findFirst({
    where: { label: category.replace(/%20/g, " ") },
  });
  if (categoryInfo) {
    if (categoryInfo.Parent.length > 0) {
      similarCategories = await prisma.category.findMany({
        where: { Parent: categoryInfo.Parent },
      });
      const parentInfo = await prisma.category.findUnique({
        where: { id: categoryInfo.Parent },
      });
      if (parentInfo) similarCategories.unshift(parentInfo);
    } else {
      similarCategories = await prisma.category.findMany({
        where: { Parent: categoryInfo.id },
      });
    }
  }
  return (
    <div className="px-10">
      <p className="my-5">
        Displaying {(sk - 1) * itemsToShow}-
        {(count - (sk - 1) * itemsToShow) / itemsToShow > 1
          ? sk * itemsToShow
          : count}{" "}
        of {count} results
      </p>
      {count > 0 && (
        <div className="flex">
          <div className="min-w-[180px] hidden md:block mr-5">
            <div className="font-bold">Price</div>
            <div className="flex flex-col items-start">
              <Link
                href={{
                  pathname: `/categories/${category.replace(/%20/g, " ")}`,
                  query: { max: firstPrice },
                }}
              >
                Under ${firstPrice}
              </Link>
              {firstPrice != 0 && secondPrice != 0 && (
                <Link
                  href={{
                    pathname: `/categories/${category.replace(/%20/g, " ")}`,
                    query: { min: firstPrice, max: secondPrice },
                  }}
                >
                  ${firstPrice} to ${secondPrice}
                </Link>
              )}
              {secondPrice != 0 && thirdPrice != 0 && (
                <Link
                  href={{
                    pathname: `/categories/${category.replace(/%20/g, " ")}`,
                    query: { min: secondPrice, max: thirdPrice },
                  }}
                >
                  ${secondPrice} to ${thirdPrice}
                </Link>
              )}
              {thirdPrice != 0 && fourthPrice != 0 && (
                <Link
                  href={{
                    pathname: `/categories/${category.replace(/%20/g, " ")}`,
                    query: { min: thirdPrice, max: fourthPrice },
                  }}
                >
                  ${thirdPrice} to ${fourthPrice}
                </Link>
              )}
              {fourthPrice != 0 && (
                <Link
                  href={{
                    pathname: `/categories/${category.replace(/%20/g, " ")}`,
                    query: { min: fourthPrice },
                  }}
                >
                  Above ${fourthPrice}
                </Link>
              )}
              <Divider />
              <details className="group [&_summary::-webkit-details-marker]:hidden w-full">
                <summary className="flex cursor-pointer items-center justify-between w-full ">
                  <span className="font-bold">Sort by</span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <nav aria-label="Teams Nav">
                  <div className="flex flex-col">
                    <Link
                      href={{
                        pathname: `/categories/${category.replace(
                          /%20/g,
                          " "
                        )}`,
                        query: { min, max, sort: "id" },
                      }}
                    >
                      Latest (default)
                    </Link>
                    <Link
                      href={{
                        pathname: `/categories/${category.replace(
                          /%20/g,
                          " "
                        )}`,
                        query: { min, max, sort: "PD" },
                      }}
                    >
                      Price (Hight to low)
                    </Link>
                    <Link
                      href={{
                        pathname: `/categories/${category.replace(
                          /%20/g,
                          " "
                        )}`,
                        query: { min, max, sort: "PA" },
                      }}
                    >
                      Price (Low to high)
                    </Link>
                  </div>
                </nav>
              </details>
              <Divider />
              <div className="">
                {similarCategories.length > 0 && (
                  <div className="flex flex-col">
                    <div className="font-bold">Discover more in:</div>

                    {similarCategories.map(({ label }) => {
                      return (
                        <Link
                          key={label}
                          href={{ pathname: `/categories/${label}` }}
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              <Divider />
              <div className="flex flex-col items-start">
                <h1 className="font-bold">Customer Reviews:</h1>
                <div className="space-y-1">
                  {starReviews.map((star) => {
                    return (
                      <div key={star} className="flex gap-1">
                        <img src={star} className="h-5" alt="" />& up
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:flex-row md:flex-wrap gap-5 flex-col">
            {products?.map((product) => {
              return <Card key={product.id} {...product} />;
            })}
          </div>
        </div>
      )}
      {count < 1 && (
        <p className="mt-10">
          Couldn`&apos;t find what you`&apos;re looking for, try using different
          keywords
        </p>
      )}
      {pages && Arr && (
        <ol className="flex justify-center gap-1 mt-16 text-sm font-medium">
          <li>
            <Link
              href={{
                pathname: `/categories/${category.replace(/%20/g, " ")}`,
                query: { page: pages.at(0), sort, min, max },
              }}
              className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full hover:bg-slate-400/50 transition "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>
          {Arr &&
            Arr.map((page: any) => (
              <li key={page}>
                <Link
                  href={{
                    pathname: `/categories/${category.replace(/%20/g, " ")}`,
                    query: { page: page, sort, min, max },
                  }}
                  className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full hover:bg-slate-400/50 transition"
                >
                  {page}
                </Link>
              </li>
            ))}
          <li>
            <Link
              href={{
                pathname: `/categories/${category.replace(/%20/g, " ")}`,
                query: { page: pages.at(-1), sort, min, max },
              }}
              className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full hover:bg-slate-400/50 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>
        </ol>
      )}
    </div>
  );
}

export default page;
