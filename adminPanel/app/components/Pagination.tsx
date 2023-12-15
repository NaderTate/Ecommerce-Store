"use client";
import { Pagination as NUI_Pagintation } from "@nextui-org/react";
import { useRouter } from "next/navigation";
type Props = {
  page: "products" | "users" | "categories" | "admins";
  total: number;
  queries?: { search?: string };
};

const Pagination = ({ page, total, queries }: Props) => {
  const router = useRouter();
  return (
    <div className="flex justify-center my-5">
      <NUI_Pagintation
        initialPage={1}
        total={total}
        onChange={(e) => {
          scrollTo(0, 0); // I want to scroll to the top of the page when user clicks on a page number, otherwise the products would change but the user would still be at the bottom
          router.push(`/${page}?page=${e}&search=${queries?.search}`);
        }}
      />
    </div>
  );
};

export default Pagination;
