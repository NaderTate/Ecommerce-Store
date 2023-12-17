import prisma from "@/lib/prisma";
import CategoryCard from "@/app/(protected)/categories/_components/CategoryCard";
import CategoryForm from "./_components/CategoryForm";
import ContentCountDisplay from "@/components/ContentCountDisplay";
import { itemsPerPage } from "@/lib/global_variables";
import SearchInput from "@/components/SearchInput";
import Pagination from "@/components/Pagination";
export const metadata = {
  title: "Categories",
  description: "Nader express categories",
};
type Props = {
  searchParams: {
    page?: number;
    search?: string;
  };
};
async function page({ searchParams }: Props) {
  const pageNumber = searchParams.page || 1;
  const search = searchParams.search ?? "";

  const categories = await prisma.category.findMany({
    where: {
      label: {
        contains: search,
        mode: "insensitive",
      },
    },
    skip: (pageNumber - 1) * itemsPerPage,
    take: itemsPerPage,
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

  const allCategories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <div className="flex flex-col min-h-[90vh]">
        <div className="flex  sm:flex-row flex-col-reverse items-start sm:items-center gap-5">
          <CategoryForm allCategories={allCategories} />
          <SearchInput page="categories" />
        </div>
        <ContentCountDisplay
          content="categories"
          count={count}
          itemsToShow={itemsPerPage}
          pageNumber={pageNumber}
        />
        <div className="grow">
          <div className="flex flex-wrap gap-5">
            {categories?.map((category) => {
              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  allCategories={allCategories}
                />
              );
            })}
          </div>
        </div>
        <Pagination
          page="categories"
          total={Math.ceil(count / itemsPerPage)}
          queries={{ search }}
        />
      </div>
    </>
  );
}

export default page;
