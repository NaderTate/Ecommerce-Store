import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="mt-10  mx-5">
      <div className="flex">
        <div className="hidden md:block w-[25vw] space-y-5">
          <Skeleton className="w-full m-auto h-2 bg-gray-500" />
          <Skeleton className="w-full m-auto h-2 bg-gray-500" />
          <Skeleton className="w-full m-auto h-2 bg-gray-500" />
          <Skeleton className="w-full m-auto h-2 bg-gray-500" />
          <Skeleton className="w-full m-auto h-2 bg-gray-500" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-center w-full gap-10">
          <Skeleton className="w-40 m-auto h-40 bg-gray-500" />
          <Skeleton className="w-40 m-auto h-40 bg-gray-500" />
          <Skeleton className="w-40 m-auto h-40 bg-gray-500" />
          <Skeleton className="w-40 m-auto h-40 bg-gray-500" />
          <Skeleton className="w-40 m-auto h-40 bg-gray-500" />
          <Skeleton className="w-40 m-auto h-40 bg-gray-500" />
          <Skeleton className="w-40 m-auto h-40 bg-gray-500" />
          <Skeleton className="w-40 m-auto h-40 bg-gray-500" />
        </div>
      </div>
    </div>
  );
}

export default loading;
