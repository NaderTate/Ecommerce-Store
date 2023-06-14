import Featured from "./components/Featured";

import { getProducts } from "@/lib/products";
import ProductCard from "./components/ProductCard";

export default async function Home() {
  const { products } = await getProducts(1, 8);
  // console.log(product);

  return (
    <div>
      <Featured />
      {/* <div className="flex gap-5 flex-wrap">
        {products?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div> */}
    </div>
  );
}
