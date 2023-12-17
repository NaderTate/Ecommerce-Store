import { Skeleton } from "@nextui-org/react";

function loading() {
  return (
    <div className="p-10 mt-20 flex flex-col items-center sm:items-start">
      <div className="flex-col sm:flex-row flex gap-10">
        <Skeleton
          disableAnimation
          className="sm:w-72 sm:h-72 w-[90vw] m-auto h-[90vw] mb-5 rounded-md"
        />
        <div className=" space-y-5">
          <Skeleton
            disableAnimation
            className="h-4 w-[90vw] sm:w-[50vw] rounded-md"
          />
          <Skeleton
            disableAnimation
            className="h-4 w-[90vw] sm:w-[50vw] rounded-md"
          />
          <Skeleton
            disableAnimation
            className="h-4 w-[90vw] sm:w-[50vw] rounded-md"
          />
          <Skeleton
            disableAnimation
            className="h-4 w-[40vw] sm:w-[50vw] rounded-md"
          />
          <Skeleton disableAnimation className="h-14 w-36 rounded-md" />
          <Skeleton
            disableAnimation
            className="h-4 w-[90vw] sm:w-[50vw] rounded-md"
          />
          <Skeleton
            disableAnimation
            className="h-4 w-[80vw] sm:w-[40vw] rounded-md"
          />
          <Skeleton
            disableAnimation
            className="h-4 w-[70vw] sm:w-[30vw] rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default loading;
