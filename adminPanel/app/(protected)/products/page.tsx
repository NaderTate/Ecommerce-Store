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
export default async function Home({ searchParams }: any) {
  const sk = searchParams.page || 1;
  const search = searchParams.search ? searchParams.search : "";
  const products = await prisma.product.findMany({
    skip: (sk - 1) * itemsPerPage,
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
      <div className="flex items-center gap-5">
        <Button as={Link} color="primary" href="/products/new">
          New
        </Button>
        <SearchInput page="products" />
      </div>
      <ContentCountDisplay
        sk={sk}
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
