import { getProducts } from "@/lib/products";
import NewProduct from "../components/NewProduct";
async function page() {
  const { products } = await getProducts();
  return (
    <div>
      <NewProduct />
      <div>Products:</div>
      {products?.map(({ Title }) => {
        return <div>{Title}</div>;
      })}
    </div>
  );
}

export default page;
