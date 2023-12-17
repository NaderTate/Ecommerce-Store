import { Skeleton } from "@nextui-org/react";

function loading() {
  return (
    <div className="mt-20 mx-5">
      <Skeleton
        disableAnimation
        className="w-[90vw] m-auto h-56 rounded-md mb-10"
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
        <Skeleton disableAnimation className="w-full m-auto h-44 rounded-md" />
        <Skeleton disableAnimation className="w-full m-auto h-44 rounded-md" />
        <Skeleton disableAnimation className="w-full m-auto h-44 rounded-md" />
        <Skeleton disableAnimation className="w-full m-auto h-44 rounded-md" />
      </div>
    </div>
  );
}

export default loading;
