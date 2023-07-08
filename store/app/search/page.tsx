import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Divider = () => {
  return (
    <hr className="border border-t border-[#030711] w-full dark:border-white/70 my-1" />
  );
};
const Card = (product: Product) => {
  return (
    <div>
      <div className="flex md:flex-col flex-row md:w-56 gap-2">
        <Link href={{ pathname: `/products/${product.id}` }}>
          <div className="relative w-24 h-24  md:w-56 md:h-56 bg-white">
            <Image
              sizes="30vw"
              fill
              className="object-cotain rounded-md"
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
const starReviews: Array<{ img: string; rating: number }> = [
  {
    img: "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687294114/Nader%20Express/4s_jotbbt.svg",
    rating: 4,
  },
  {
    img: "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687294115/Nader%20Express/3s_fa6fvk.svg",
    rating: 3,
  },
  {
    img: "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687294114/Nader%20Express/2s_bsbrgl.svg",
    rating: 2,
  },
  {
    img: "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687293658/Nader%20Express/Frame_1_utki4s.svg",
    rating: 1,
  },
];
export async function generateMetadata({ searchParams }: any) {
  try {
    return {
      title: "search results for " + searchParams.s || "Nader Express",
      description: "Nader Express",
      twitter: {
        card: "summary_large_image",
        site: "@naderexpress",
        title: "search results for " + searchParams.s || "Nader Express",
        description: "Nader Express",
        images: [
          {
            url: "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687293658/Nader%20Express/Frame_1_utki4s.svg",
            width: 800,
            height: 600,
          },
        ],
      },
      openGraph: {
        title: "search results for " + searchParams.s || "Nader Express",
        images: [
          {
            url: "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687293658/Nader%20Express/Frame_1_utki4s.svg",
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Not found",
      description: "This page does not exist",
    };
  }
}
async function search({ searchParams }: any) {
  const search = searchParams.s || "";
  const min = Number(searchParams.min) || 0;
  const max = Number(searchParams.max) || 9999999;
  const sort = searchParams.sort || "id";
  const sk = searchParams.page || 1;
  const itemsToShow = 30;
  const starRating = Number(searchParams.sr) || 0;

  const results = await prisma.product.findMany({
    include: { Categories: true },
    where: {
      OR: [
        {
          Title: { contains: search, mode: "insensitive" },
        },
        {
          Categories: {
            some: { label: search.charAt(0).toUpperCase() + search.slice(1) },
          },
        },
        { Colors: { hasSome: search } },
        { Description: { contains: search, mode: "insensitive" } },
      ],
      AND: [
        { Price: { gt: min } },
        { Price: { lt: max } },
        { Rating: { gt: starRating } },
      ],
    },
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
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
    // select: { Title: true },
  });

  const count = (
    await prisma.product.findMany({
      include: { Categories: true },
      where: {
        OR: [
          {
            Title: { contains: search, mode: "insensitive" },
          },
          {
            Categories: {
              some: { label: search.charAt(0).toUpperCase() + search.slice(1) },
            },
          },
          { Colors: { hasSome: search } },
          { Description: { contains: search, mode: "insensitive" } },
        ],
        AND: [
          { Price: { gt: min } },
          { Price: { lt: max } },
          { Rating: { gt: starRating } },
        ],
      },
      orderBy: [
        {
          Price: "desc",
        },
      ],
    })
  ).length;

  const allData = await prisma.product.findMany({
    include: { Categories: true },
    where: {
      OR: [
        {
          Title: { contains: search, mode: "insensitive" },
        },
        {
          Categories: {
            some: { label: search.charAt(0).toUpperCase() + search.slice(1) },
          },
        },
        { Colors: { hasSome: search } },
        { Description: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: [
      {
        Price: "desc",
      },
    ],
  });
  const highestPrice: any = allData.at(0)?.Price;
  const lowestPrice: any = allData.at(-1)?.Price;
  const difference: number = Math.floor(highestPrice - lowestPrice);
  const segment = Math.floor(difference / 5);
  const firstPrice = Math.ceil(lowestPrice + segment);
  const secondPrice = Math.floor(segment * 2);
  const thirdPrice = Math.floor(segment * 3);
  const fourthPrice = Math.floor(segment * 4);

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
  const category = await prisma.category.findFirst({
    where: {
      label: { contains: search, mode: "insensitive" },
    },
    select: {
      id: true,
      label: true,
      Parent: {
        select: {
          children: { select: { id: true, label: true } },
          label: true,
          id: true,
        },
      },
      children: { select: { id: true, label: true } },
      ParentId: true,
    },
  });
  let allCategories: Array<{ id: string; label: string }> = [];
  if (category) {
    if (category.ParentId && category.Parent?.children) {
      allCategories = category.Parent?.children;
      allCategories.unshift({
        id: category.Parent.id,
        label: category.Parent.label,
      });
    } else {
      allCategories = category.children;
      allCategories.unshift({ id: category.id, label: category.label });
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
      {count < 1 && (
        <p className="mt-10">
          Couldn`&apos;t find what you`&apos;re looking for, try using different
          keywords
        </p>
      )}
      {count > 0 && (
        <div className="flex">
          <div className="min-w-[180px] hidden md:block mr-5">
            <div className="font-bold">Price</div>
            <div className="flex flex-col items-start">
              {firstPrice != 0 && (
                <Link
                  href={{
                    pathname: "/search",
                    query: { s: search, max: firstPrice },
                  }}
                >
                  Under ${firstPrice}
                </Link>
              )}
              {firstPrice != 0 && secondPrice != 0 && (
                <Link
                  href={{
                    pathname: "/search",
                    query: { s: search, min: firstPrice, max: secondPrice },
                  }}
                >
                  ${firstPrice} to ${secondPrice}
                </Link>
              )}
              {secondPrice != 0 && thirdPrice != 0 && (
                <Link
                  href={{
                    pathname: "/search",
                    query: { s: search, min: secondPrice, max: thirdPrice },
                  }}
                >
                  ${secondPrice} to ${thirdPrice}
                </Link>
              )}
              {thirdPrice != 0 && fourthPrice != 0 && (
                <Link
                  href={{
                    pathname: "/search",
                    query: { s: search, min: thirdPrice, max: fourthPrice },
                  }}
                >
                  ${thirdPrice} to ${fourthPrice}
                </Link>
              )}
              {fourthPrice != 0 && (
                <Link
                  href={{
                    pathname: "/search",
                    query: { s: search, min: fourthPrice },
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
                        pathname: "/search",
                        query: { s: search, min, max, sort: "id" },
                      }}
                    >
                      Latest (default)
                    </Link>
                    <Link
                      href={{
                        pathname: "/search",
                        query: { s: search, min, max, sort: "PD" },
                      }}
                    >
                      Price (Hight to low)
                    </Link>
                    <Link
                      href={{
                        pathname: "/search",
                        query: { s: search, min, max, sort: "PA" },
                      }}
                    >
                      Price (Low to high)
                    </Link>
                  </div>
                </nav>
              </details>
              <Divider />
              <div className="">
                {allCategories.length > 0 && (
                  <div className="flex flex-col">
                    <div className="font-bold">Discover more in:</div>
                    {allCategories.map(({ id, label }) => {
                      return (
                        <Link key={id} href={{ pathname: `/categories/${id}` }}>
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
                  {starReviews.map(({ img, rating }) => {
                    return (
                      <div key={img}>
                        <Link
                          href={{
                            pathname: `/search`,
                            query: { s: search, min, max, sr: rating },
                          }}
                        >
                          <div className="flex gap-1">
                            <Image width={112} height={20} src={img} alt="" />&
                            up
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:flex-row md:flex-wrap gap-5 flex-col">
            {results?.map((product) => {
              return <Card key={product.id} {...product} />;
            })}
          </div>
        </div>
      )}
      {pages && Arr && (
        <ol className="flex justify-center gap-1 mt-16 text-sm font-medium">
          <li>
            <Link
              href={{
                pathname: "/search",
                query: {
                  page: pages.at(0),
                  s: search,
                  sort,
                  min,
                  max,
                  sr: starRating,
                },
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
                    pathname: "/search",
                    query: {
                      page: page,
                      s: search,
                      sort,
                      min,
                      max,
                      sr: starRating,
                    },
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
                pathname: "/search",
                query: {
                  page: pages.at(-1),
                  s: search,
                  sort,
                  min,
                  max,
                  sr: starRating,
                },
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

export default search;
