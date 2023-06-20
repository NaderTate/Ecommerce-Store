import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="p-10 flex flex-col items-center sm:items-start">
      <div className="flex-col sm:flex-row flex gap-10">
        <Skeleton className="sm:w-72 sm:h-72 w-[90vw] m-auto h-[90vw] bg-gray-500 mb-5" />
        <div className=" space-y-5">
          <Skeleton className="h-4 w-[90vw] sm:w-[50vw] bg-gray-500" />
          <Skeleton className="h-4 w-[90vw] sm:w-[50vw] bg-gray-500" />
          <Skeleton className="h-4 w-[90vw] sm:w-[50vw] bg-gray-500" />
          <Skeleton className="h-4 w-[40vw] sm:w-[50vw] bg-gray-500" />

          <div className="flex gap-10">
            <Skeleton className="h-14 w-36 bg-gray-500" />
            <Skeleton className="h-14 w-36 bg-gray-500" />
          </div>
          <Skeleton className="h-4 w-[90vw] sm:w-[50vw] bg-gray-500" />
          <Skeleton className="h-4 w-[80vw] sm:w-[40vw] bg-gray-500" />
          <Skeleton className="h-4 w-[70vw] sm:w-[30vw] bg-gray-500" />
        </div>
      </div>
    </div>
  );
}

export default loading;
