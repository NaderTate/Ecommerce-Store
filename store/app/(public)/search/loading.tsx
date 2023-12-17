import { Skeleton } from "@nextui-org/react";

function loading() {
  return (
    <div className="mt-20 mx-5">
      <div className="flex">
        <div className="hidden md:block w-[25vw] space-y-5">
          <Skeleton disableAnimation className="w-full m-auto h-2 rounded-md" />
          <Skeleton disableAnimation className="w-full m-auto h-2 rounded-md" />
          <Skeleton disableAnimation className="w-full m-auto h-2 rounded-md" />
          <Skeleton disableAnimation className="w-full m-auto h-2 rounded-md" />
          <Skeleton disableAnimation className="w-full m-auto h-2 rounded-md" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-center w-full gap-10">
          <Skeleton disableAnimation className="w-40 m-auto h-40 rounded-md" />
          <Skeleton disableAnimation className="w-40 m-auto h-40 rounded-md" />
          <Skeleton disableAnimation className="w-40 m-auto h-40 rounded-md" />
          <Skeleton disableAnimation className="w-40 m-auto h-40 rounded-md" />
          <Skeleton disableAnimation className="w-40 m-auto h-40 rounded-md" />
          <Skeleton disableAnimation className="w-40 m-auto h-40 rounded-md" />
          <Skeleton disableAnimation className="w-40 m-auto h-40 rounded-md" />
          <Skeleton disableAnimation className="w-40 m-auto h-40 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default loading;
