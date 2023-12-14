import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import NavLayout from "@/app/components/NavLayout";
import CategoryForm from "./_components/CategoryForm";
import CategoryCard from "@/app/components/CategoryCard";
import CategoryPopup from "./_components/CategoryPopup";
export const metadata = {
  title: "Categories",
  description: "Nader express categories",
};
async function page({ searchParams }: any) {
  const itemsToShow = 30;
  const sk = searchParams.page || 1;
  const search = searchParams.search ? searchParams.search : "";
  const categories = await prisma.category.findMany({
    where: {
      label: {
        contains: search,
        mode: "insensitive",
      },
    },
    skip: (sk - 1) * itemsToShow,
    take: itemsToShow,
    orderBy: {
      createdAt: "desc",
    },
  });
  const allCategories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const count = await prisma.category.count({
    where: {
      label: {
        contains: search,
        mode: "insensitive",
      },
    },
  });
  const number = count || 1;

  return (
    <NavLayout>
      <div className="flex flex-col min-h-[90vh]">
        <CategoryPopup allCategories={allCategories} />
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
      </div>
    </NavLayout>
  );
}

export default page;
