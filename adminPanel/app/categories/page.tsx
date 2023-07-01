import React from "react";
import NavLayout from "../components/NavLayout";
import Categories from "../components/Categories";
import CategoryCard from "../components/CategoryCard";
import { getCategories } from "@/lib/categories";
import Link from "next/link";
import { createCategoryAction, updataCategoryAction } from "../_actions";
import { revalidatePath } from "next/cache";
async function page({ searchParams }: any) {
  const itemsToShow = 30;
  const sk = searchParams.page || 1;
  const search = searchParams.search ? searchParams.search : "";
  const { categories } = await getCategories(sk, itemsToShow);
  const allCategories = (await getCategories(1, 999999)).categories;
  const { count } = await getCategories(0, 0);
  const number = count || 1;
  const pages = Array.from(
    { length: Math.ceil(number / itemsToShow) },
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
  return (
    <NavLayout>
      <div className="flex flex-col min-h-[90vh]">
        <details className="group [&_summary::-webkit-details-marker]:hidden ">
          <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white bg-[#1d4ed8] w-24">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">New</span>
            </div>

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

          <nav aria-label="Teams Nav" className="mt-2 ">
            <Categories
              createCategory={async ({
                label,
                Image,
                Properties,
                Parent,
              }: {
                label: string;
                Image: string;
                Properties: any;
                Parent: string;
              }) => {
                "use server";
                await createCategoryAction(label, Image, Properties, Parent);
                revalidatePath("/categories");
              }}
              updateCategory={async ({
                id,
                label,
                Image,
                Properties,
                Parent,
              }: {
                id: string;
                label: string;
                Image: string;
                Properties: any;
                Parent: string;
              }) => {
                "use server";
                await updataCategoryAction(
                  id,
                  label,
                  Image,
                  Properties,
                  Parent
                );
                revalidatePath("/categories");
              }}
              allCategories={allCategories}
              category={{
                id: "",
                label: "",
                Image: "",
                value: 0,
                Properties: [],
                ProductsIDs: [],
                ParentId: "",
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
              }}
            />
          </nav>
        </details>
        <p className="mt-5">
          Displaying {(sk - 1) * itemsToShow}-
          {(number - (sk - 1) * itemsToShow) / itemsToShow > 1
            ? sk * itemsToShow
            : number}{" "}
          of {count} categories
        </p>
        <div className="grow">
          <div className="flex flex-wrap justify-center sm:justify-between gap-5 mt-5">
            {categories?.map((category) => {
              return <CategoryCard key={category.id} category={category} />;
            })}
          </div>
        </div>
        {pages && Arr && (
          <ol className="flex justify-center gap-1 mt-16 text-sm font-medium">
            <li>
              <Link
                href={{
                  pathname: "/categories",
                  query: { page: pages.at(0), search: search },
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
                      pathname: "/categories",
                      query: { page: page, search: search },
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
                  pathname: "/categories",
                  query: { page: pages.at(-1), search: search },
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
    </NavLayout>
  );
}

export default page;
