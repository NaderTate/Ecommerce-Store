import NavLayout from "@/app/components/NavLayout";
import ProductForm from "@/app/components/ProductForm";
import { getProductById } from "@/lib/products";
import { getCategories } from "@/lib/categories";
async function page({ searchParams }: any) {
  const id = searchParams.id;
  const productInfo = await getProductById(id);
  const { categories } = await getCategories(1, 99);
  return (
    <div>
      <NavLayout>
        <div className="font-bold text-xl mb-5">Edit</div>
        {productInfo && (
          <ProductForm allCategories={categories} {...productInfo.product} />
        )}
      </NavLayout>
    </div>
  );
}
export default page;
