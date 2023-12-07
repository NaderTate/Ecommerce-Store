import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/app/components/ProductCard";
import StarRatings from "./StarRatings";
import { Divider } from "@nextui-org/react";
import {
  calculatePriceFilter,
  getCategoryProducts,
  getSimilarCategories,
} from "./utils";
import PriceFilter from "./PriceFilter";
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

export async function generateMetadata({
  params: { category },
}: {
  params: { category: string };
}) {
  try {
    const categoryInfo = await prisma.category.findUnique({
      where: { id: category },
      select: {
        Image: true,
        label: true,
      },
    });

    return {
      title: "Shop for " + categoryInfo?.label + " products" || "Nader Express",
      description: "Nader Express",
      twitter: {
        card: "summary_large_image",
        site: "@naderexpress",
        title: "Shop for " + category + " products" || "Nader Express",
        description: "Nader Express",
        images: [
          {
            url:
              categoryInfo?.Image ||
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687293658/Nader%20Express/Frame_1_utki4s.svg",
            width: 800,
            height: 600,
          },
        ],
      },
      openGraph: {
        title:
          "Shop for " + categoryInfo?.label + " products" || "Nader Express",
        images: [
          {
            url:
              categoryInfo?.Image ||
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687293658/Nader%20Express/Frame_1_utki4s.svg",
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
async function page({
  params: { category },
  searchParams,
}: {
  params: { category: string };
  searchParams: any;
}) {
  const sk = searchParams.page || 1;
  const itemsToShow = 30;
  const min = Number(searchParams.min);
  const max = Number(searchParams.max);
  const sort = searchParams.sort || "id";
  const starRating = Number(searchParams.sr);

  // 1st parameter: categoryId, 2nd parameter: pagination (limit,skip), 3rd parameter: filters, 4th parameter: sort
  const { products, count, highestPrice, lowestPrice } =
    await getCategoryProducts(
      category,
      { limit: itemsToShow, skip: (sk - 1) * itemsToShow },
      { minPrice: min, maxPrice: max, minRating: starRating },
      { id: "desc" }
    );
  const priceFilter = calculatePriceFilter(highestPrice, lowestPrice, 5);
  const similarCategories = await getSimilarCategories(category);
  return (
    <div className="px-10 mt-10">
      <p className="mt-20">
        Displaying {(sk - 1) * itemsToShow}-
        {(count - (sk - 1) * itemsToShow) / itemsToShow > 1
          ? sk * itemsToShow
          : count}{" "}
        of {count} results
      </p>
      {count > 0 && (
        <div className="flex">
          <div className="min-w-[180px] hidden md:block mr-5">
            <div className="flex flex-col items-start">
              <div className="flex flex-col items-start">
                <PriceFilter
                  link={`/categories/${category}`}
                  otherQueries={{ sr: starRating }}
                  pricesList={priceFilter}
                />
              </div>

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

                    {similarCategories.map(({ id, label }) => {
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
                <h1 className="font-bold">Filter by rating:</h1>
                <div className="space-y-1">
                  <StarRatings />
                  {starReviews.map(({ img, rating }) => {
                    return (
                      <div key={img}>
                        <Link
                          href={{
                            pathname: `/categories/${category}`,
                            query: { min, max, sr: rating },
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
            {products?.map((product) => {
              return (
                <div key={product.id} className="w-56">
                  <ProductCard product={product} />
                </div>
              );
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
    </div>
  );
}

export default page;
