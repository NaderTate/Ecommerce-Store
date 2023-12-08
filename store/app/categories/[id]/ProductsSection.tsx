import ProductCard from "@/app/components/ProductCard";

type Props = {
  products: {
    id: string;
    mainImg: string;
    secondImage: string;
    Title: string;
    Price: number;
  }[];
};

const ProductsSection = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <div key={product.id} className="w-full">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductsSection;
