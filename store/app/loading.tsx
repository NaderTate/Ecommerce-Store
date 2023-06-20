import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="mt-5 md:mt-0 mx-5">
      <Skeleton className="w-[90vw] m-auto h-56 bg-gray-500 mb-10" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
        <Skeleton className="w-full m-auto h-44 bg-gray-500" />
        <Skeleton className="w-full m-auto h-44 bg-gray-500" />
        <Skeleton className="w-full m-auto h-44 bg-gray-500" />
        <Skeleton className="w-full m-auto h-44 bg-gray-500" />
      </div>
    </div>
  );
}

export default loading;
