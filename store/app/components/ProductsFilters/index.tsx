"use client";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import PriceFilter from "./PriceFilter";
import SortByFilter from "./SortByFilter";
import DiscoverMore from "./DiscoverMore";
import RatingFilter from "./RatingFilter";
import { useState } from "react";
import { IoChevronForward } from "react-icons/io5";
type Props = {
  pricesList?: number[];
  similarCategories?: { id: string; label: string }[];
  onPriceChange: (min: number | undefined, max: number | undefined) => void;
  onSortChange: (
    sortBy:
      | { price?: "asc" | "desc" | undefined; id?: "desc" | undefined }
      | undefined
  ) => void;
  onRatingChange: (minRating: number | undefined) => void;
  isFilterApplied: boolean;
  clearFilters: () => void;
};

const ProductsFilters = ({
  pricesList,
  similarCategories,
  onPriceChange,
  onSortChange,
  onRatingChange,
  isFilterApplied,
  clearFilters,
}: Props) => {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div className="">
      <Button
        endContent={<IoChevronForward />}
        color="primary"
        onPress={() => setShowSideBar(!showSideBar)}
        className="md:hidden fixed z-50 top-16 left-5"
      >
        Filters
      </Button>
      <div className={`h-full fixed  z-30 `}>
        <div
          className={`overflow-y-scroll h-[85vh] fixed no-scrollbar w-56 flex-shrink-0 bg-background rounded-md mt-7 md:mt-0 md:opacity-100  md:translate-x-0 transition-all ${
            showSideBar
              ? " opacity-100 translate-x-0"
              : " -translate-x-[100vw] opacity-0"
          }`}
        >
          <Accordion className="" defaultExpandedKeys={["1", "3"]} isCompact>
            <AccordionItem
              key="1"
              aria-label="Price"
              title="Price"
              className={`${
                (!pricesList || pricesList.length < 1) && " hidden"
              }`}
            >
              <PriceFilter pricesList={pricesList} onChange={onPriceChange} />
            </AccordionItem>
            <AccordionItem key="2" aria-label="Sort By" title="Sort By">
              <SortByFilter onChange={onSortChange} />
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Discover More"
              title="Discover More"
              className={`${
                (!similarCategories || similarCategories.length < 1) &&
                " hidden"
              }`}
            >
              <DiscoverMore categories={similarCategories || []} />
            </AccordionItem>
            <AccordionItem key="4" aria-label="Rating" title="Rating">
              <RatingFilter onChange={onRatingChange} />
            </AccordionItem>
          </Accordion>
          {isFilterApplied && (
            <Button onPress={clearFilters} color="danger">
              Clear filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsFilters;
