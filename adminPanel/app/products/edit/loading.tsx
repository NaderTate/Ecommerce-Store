import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import NavLayout from "@/app/components/NavLayout";
function loading() {
  return (
    <NavLayout>
      Edit Product
      <form className="space-y-4 mt-5">
        <div className="md:grid grid-cols-5 justify-between gap-5">
          <div className="col-span-3">
            <Skeleton className=" bg-gray-500 h-12 w-full my-1 md:m-0" />
          </div>
          <div className="col-span-2">
            <Skeleton className=" bg-gray-500 h-12 full" />
          </div>
        </div>
        <div className="md:grid grid-cols-5 justify-between gap-5">
          <div className="col-span-3">
            <Skeleton className=" bg-gray-500 h-32 w-full" />
          </div>
          <div className="col-span-2">
            <div className="mb-5">
              <div className="text-black">
                <Skeleton className=" bg-gray-500 h-12 w-full my-1 md:m-0" />
              </div>
            </div>
            <div>
              <div className="text-black">
                <Skeleton className=" bg-gray-500 h-12 w-full" />
              </div>
            </div>
          </div>
        </div>

        <h1>Images:</h1>
        <div className="flex flex-wrap gap-5 justify-around">
          {Array.from({ length: 7 }, (_, i) => i + 1).map((id) => (
            <Skeleton key={id} className=" bg-gray-500 h-32 w-32" />
          ))}
        </div>

        <div className="flex gap-5 flex-wrap">
          {/* ReactSortable allows us to rearrange images by dragging them */}
        </div>
      </form>
    </NavLayout>
  );
}

export default loading;
