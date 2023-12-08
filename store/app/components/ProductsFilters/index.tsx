"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import PriceFilter from "./PriceFilter";
import SortByFilter from "./SortByFilter";
import DiscoverMore from "./DiscoverMore";
import RatingFilter from "./RatingFilter";
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
};

const ProductsFilters = ({
  onPriceChange,
  onSortChange,
  pricesList,
  similarCategories,
  onRatingChange,
}: Props) => {
  return (
    <Accordion defaultExpandedKeys={["1", "3"]} isCompact>
      <AccordionItem
        key="1"
        aria-label="Price"
        title="Price"
        className={`${(!pricesList || pricesList.length < 1) && " hidden"}`}
      >
        <PriceFilter
          pricesList={pricesList}
          onChange={(min, max) => {
            onPriceChange(min, max);
          }}
        />
      </AccordionItem>
      <AccordionItem key="2" aria-label="Sort By" title="Sort By">
        <SortByFilter
          onChange={(sortBy) => {
            onSortChange(sortBy);
          }}
        />
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Discover More"
        title="Discover More"
        className={`${
          (!similarCategories || similarCategories.length < 1) && " hidden"
        }`}
      >
        <DiscoverMore categories={similarCategories || []} />
      </AccordionItem>
      <AccordionItem key="4" aria-label="Rating" title="Rating">
        <RatingFilter
          onChange={(minRating) => {
            onRatingChange(minRating);
          }}
        />
      </AccordionItem>
    </Accordion>
  );
};

export default ProductsFilters;
