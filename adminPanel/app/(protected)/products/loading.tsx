import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import NavLayout from "@/app/components/NavLayout";
function loading() {
  return (
    <NavLayout>
      <Link
        className=" rounded-lg bg-blue-700 tracking-widest px-5 py-3 font-medium text-white "
        href={{ pathname: "/products/new" }}
      >
        New
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 mt-4 gap-4 ">
        {Array.from({ length: 15 }, (_, i) => i + 1).map((id) => (
          <div key={id}>
            <div className="flex gap-3 relative border-2 pr-1 rounded-md ">
              <Skeleton className="w-[6rem] h-[6rem] bg-gray-500" />
              <div className="flex flex-col justify-around">
                <Skeleton className="w-24 h-2  bg-gray-500" />
                <Skeleton className="w-36 h-2  bg-gray-500" />
                <Skeleton className="w-10 h-2  bg-gray-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </NavLayout>
  );
}

export default loading;
