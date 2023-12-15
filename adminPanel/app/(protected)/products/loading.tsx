import Link from "next/link";
import { Button, Skeleton } from "@nextui-org/react";
function loading() {
  return (
    <>
      <Button as={Link} color="primary" href="/products/new">
        New
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 mt-4 gap-4 ">
        {Array.from({ length: 15 }, (_, i) => i + 1).map((id) => (
          <div key={id}>
            <div className="flex gap-3 relative border-2 pr-1 rounded-md ">
              <Skeleton disableAnimation className="w-[6rem] h-[6rem] " />
              <div className="flex flex-col justify-around">
                <Skeleton disableAnimation className="w-24 h-2  " />
                <Skeleton disableAnimation className="w-36 h-2  " />
                <Skeleton disableAnimation className="w-10 h-2  " />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default loading;
