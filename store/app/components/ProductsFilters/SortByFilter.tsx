"use client";

import FilterButton from "./FilterButton";

type Props = {
  onChange: (
    sortBy:
      | { price?: "asc" | "desc" | undefined; id?: "desc" | undefined }
      | undefined
  ) => void;
};

const SortByFilter = ({ onChange }: Props) => {
  return (
    <div>
      <FilterButton onClick={() => onChange({ id: "desc" })}>
        Latest
      </FilterButton>
      <FilterButton onClick={() => onChange({ price: "asc" })}>
        Price: Low to High
      </FilterButton>
      <FilterButton onClick={() => onChange({ price: "desc" })}>
        Price: High to Low
      </FilterButton>
    </div>
  );
};

export default SortByFilter;
