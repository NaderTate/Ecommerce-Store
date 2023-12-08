"use client";
import ProductsSection from "./ProductsSection";
import ProductsFilters from "@/app/components/ProductsFilters";
import { useFetchData } from "./useFetchData";
type Props = { categoryId: string };

const Main = ({ categoryId }: Props) => {
  const {
    products,
    similarCategories,
    pricesList,
    productsCount,
    setMaxPrice,
    setMinPrice,
    setMinRating,
    setSortBy,
  } = useFetchData(categoryId);
  // ⬆️⬆️ my first custom hook, this code is cleeeean, les go
  return (
    <>
      <div className="flex mt-20">
        <div className="w-56 flex-shrink-0 fixed">
          <ProductsFilters
            pricesList={pricesList}
            similarCategories={similarCategories}
            onPriceChange={(min, max) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
            onSortChange={(sortBy) => {
              setSortBy(sortBy);
            }}
            onRatingChange={(minRating) => {
              setMinRating(minRating);
            }}
          />
        </div>
        <div className="ml-56 ">
          <ProductsSection products={products} />
        </div>
      </div>
    </>
  );
};

export default Main;
