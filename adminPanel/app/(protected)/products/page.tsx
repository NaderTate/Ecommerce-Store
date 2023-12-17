import prisma from "@/lib/prisma";

import Link from "next/link";
import { Button } from "@nextui-org/react";

import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import ContentCountDisplay from "@/components/ContentCountDisplay";
import ProductCard from "@/app/(protected)/products/_components/ProductCard";

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
    select: {
      id: true,
      Price: true,
      Title: true,
      mainImg: true,
      Description: true,
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
      <div className="flex sm:flex-row flex-col-reverse items-start sm:items-center gap-5">
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
        className="mt-5"
      />
      <div className="flex flex-col min-h-[90vh]">
        <div className="grow">
          <div className="flex flex-wrap gap-5 ">
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
