import { Skeleton } from "@nextui-org/react";
function loading() {
  return (
    <>
      <h4>Edit Product</h4>
      <div className="space-y-4 mt-5">
        <div className="md:grid grid-cols-5 justify-between gap-5">
          <Skeleton
            disableAnimation
            className="h-12 w-full my-1 md:m-0 col-span-3 rounded-md"
          />
          <Skeleton disableAnimation className=" h-12 full col-span-2 " />
        </div>
        <div className="md:grid grid-cols-5 justify-between gap-5">
          <Skeleton
            disableAnimation
            className="h-32 w-full col-span-3 rounded-md"
          />
          <div className="col-span-2">
            <Skeleton
              disableAnimation
              className="h-12 w-full my-1 md:m-0 mb-5 rounded-md"
            />
            <Skeleton disableAnimation className="h-12 w-full rounded-md" />
          </div>
        </div>
        <h1>Images:</h1>
        <div className="flex flex-wrap gap-5 justify-around">
          {Array.from({ length: 7 }, (_, i) => i + 1).map((id) => (
            <Skeleton
              disableAnimation
              key={id}
              className="h-32 w-32 rounded-md"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default loading;
