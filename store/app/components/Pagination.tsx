"use client";
import { Pagination as NUI_Pagintation } from "@nextui-org/pagination";
type Props = { count: number; onChange: (page: number) => void };

const Pagination = ({ count, onChange }: Props) => {
  return (
    <div className="flex justify-center my-5">
      <NUI_Pagintation
        initialPage={1}
        total={count}
        onChange={(e) => {
          scrollTo(0, 0); // I want to scroll to the top of the page when user clicks on a page number, otherwise the products would change but the user would still be at the bottom
          onChange(e);
        }}
      />
    </div>
  );
};

export default Pagination;
