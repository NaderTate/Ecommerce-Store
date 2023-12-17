"use client";

import Pagination from "@/components/Pagination";
import ProductsFilters from "@/components/ProductsFilters";
import ProductsSection from "../categories/[id]/_components/ProductsSection";

import { useFetchProducts } from "@/hooks/useFetchProducts";

import { productsPerPage } from "@/lib/global_variables";

type Props = { searchQuery: string };

const Main = ({ searchQuery }: Props) => {
  const {
    products,
    similarCategories,
    pricesList,
    productsCount,
    loading,
    isFilterApplied,
    clearFilters,
    setMaxPrice,
    setMinPrice,
    setMinRating,
    setSortBy,
    setPage,
  } = useFetchProducts({ searchQuery });
  return (
    <div className="flex mt-28 md:mt-20 mx-5">
      <ProductsFilters
        pricesList={pricesList}
        similarCategories={similarCategories}
        onPriceChange={(min, max) => {
          setMinPrice(min);
          setMaxPrice(max);
          setPage(1);
        }}
        onSortChange={setSortBy}
        onRatingChange={setMinRating}
        isFilterApplied={isFilterApplied}
        clearFilters={clearFilters}
      />
      <div className={`md:ml-56 w-full ${loading && " animate-pulse"}`}>
        {/* search results for... */}
        <h1 className="text-2xl text-gray-500">
          Search results for {searchQuery}
        </h1>
        <ProductsSection products={products} />
        <Pagination
          count={Math.ceil(productsCount / productsPerPage)}
          onChange={setPage}
        />
      </div>
    </div>
  );
};

export default Main;
