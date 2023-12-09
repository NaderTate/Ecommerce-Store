import { Skeleton as Next_UI_Skeleton } from "@nextui-org/react";

type Props = {};
const Skeleton = () => (
  <Next_UI_Skeleton
    className="w-full h-full aspect-square rounded-md"
    disableAnimation
  />
);
const ProductsSkeleton = (props: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

export default ProductsSkeleton;
