import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import NavLayout from "@/app/components/NavLayout";
function loading() {
  return (
    <NavLayout>
      Edit
      <div>
        <div className="mt-2">
          <form className="flex gap-3 lg:items-end mb-2 flex-col lg:flex-row items-start">
            <Skeleton className="w-full h-12 bg-gray-500" />
            <Skeleton className="w-full h-12 bg-gray-500" />
            <Skeleton className="w-full h-12 bg-gray-500" />
            <Skeleton className="lg:w-3/4 w-[128px] h-[128px] bg-gray-500" />
          </form>

          <div className="mt-10 mb-2">
            <Skeleton className="w-48 h-12 bg-gray-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Skeleton className="w-full h-12 bg-gray-500" />
            <Skeleton className="w-full h-12 bg-gray-500" />
          </div>
        </div>
      </div>
    </NavLayout>
  );
}

export default loading;
