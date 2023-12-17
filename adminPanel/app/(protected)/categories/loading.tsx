import { Skeleton } from "@nextui-org/react";
function loading() {
  return (
    <>
      <div className="flex flex-wrap mt-4 gap-4 ">
        {Array.from({ length: 15 }, (_, i) => i + 1).map((id) => (
          <div
            key={id}
            className="flex flex-col gap-1 relative border-2 rounded-md "
          >
            <Skeleton disableAnimation className="w-[10rem] h-[10rem]" />
            <div className="mb-1">
              <Skeleton disableAnimation className="w-[7rem] h-2 rounded-md" />
              <Skeleton
                disableAnimation
                className="w-[4rem] h-2 rounded-md mt-2"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default loading;
