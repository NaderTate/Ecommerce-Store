"use client";
import ProductsSection from "./ProductsSection";
import ProductsFilters from "@/app/components/ProductsFilters";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import Pagination from "@/app/components/Pagination";
import { productsPerPage } from "@/app/global_variables";
type Props = { categoryId: string };

const Main = ({ categoryId }: Props) => {
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
    <div className="flex mt-20 mx-5">
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
