import ProductsSkeleton from "./ProductsSkeleton";
import ProductCard from "@/components/ProductCard";

type Props = {
  products:
    | {
        id: string;
        mainImg: string;
        secondImage: string;
        Title: string;
        Price: number;
      }[]
    | undefined;
};

const ProductsSection = ({ products }: Props) => {
  // undefined is the initial state of the products, it means we are still fetching the data
  if (products === undefined) {
    return <ProductsSkeleton />;
  }

  // if the products array is empty, it means we are done fetching the data but there are no products
  if (products?.length === 0) {
    return (
      <p className="text-center text-2xl text-gray-500">No products found 😢</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products?.map((product) => (
        <div key={product.id} className="w-full">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductsSection;
