// This component is the parent of the filters and the products sections
// It takes the filters values from the user and pass them to the useFetchProducts hook then passes them to the products section to be displayed

"use client";

import ProductsSection from "./ProductsSection";
import Pagination from "@/components/Pagination";
import ProductsFilters from "@/components/ProductsFilters";

import { useFetchProducts } from "@/hooks/useFetchProducts";

import { productsPerPage } from "@/lib/global_variables";

type Props = { categoryId: string };

const Main = ({ categoryId }: Props) => {
  // This is a custom hook that fetches the products based on the filters values

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
  } = useFetchProducts({ categoryId });
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
        {products && (
          <p className="mb-2 ">
            displaying {products?.length} of {productsCount} results
          </p>
        )}

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
