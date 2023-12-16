import Link from "next/link";
import prisma from "@/lib/prisma";
import ProductCard from "@/app/(protected)/products/_components/ProductCard";
import SearchInput from "@/app/components/SearchInput";
import Pagination from "@/app/components/Pagination";
import { Button } from "@nextui-org/react";
import ContentCountDisplay from "@/app/components/ContentCountDisplay";
import { itemsPerPage } from "@/lib/global_variables";
export const metadata = {
  title: "Products",
  description: "Nader Express Products",
};
type Props = {
  searchParams: {
    page?: number;
    search?: string;
  };
};
export default async function Home({ searchParams }: Props) {
  const pageNumber = searchParams.page || 1;
  const search = searchParams.search ?? "";
  const products = await prisma.product.findMany({
    skip: (pageNumber - 1) * itemsPerPage,
    take: itemsPerPage,
    where: {
      Title: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const count = await prisma.product.count({
    where: {
      Title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return (
    <>
      <div className="flex  sm:flex-row flex-col-reverse items-start sm:items-center gap-5">
        <Button size="lg" as={Link} color="primary" href="/products/new">
          New
        </Button>
        <SearchInput page="products" />
      </div>
      <ContentCountDisplay
        pageNumber={pageNumber}
        itemsToShow={itemsPerPage}
        count={count}
        content="products"
      />
      <div className="flex flex-col min-h-[90vh]">
        <div className="grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 mt-4 gap-4 ">
            {products?.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        </div>
        <Pagination
          page="products"
          total={Math.ceil(count / itemsPerPage)}
          queries={{ search }}
        />
      </div>
    </>
  );
}
