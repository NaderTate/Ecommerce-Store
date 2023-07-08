import NavLayout from "@/app/components/NavLayout";
import ProductForm from "@/app/components/ProductForm";
import { getCategories } from "@/lib/categories";
export const metadata = {
  title: "Add new product",
  description: "Add new product",
};
async function page() {
  const { categories } = await getCategories(1, 99);
  return (
    <NavLayout>
      <div className="font-bold text-xl mb-5">Add new product</div>
      <ProductForm allCategories={categories} />
    </NavLayout>
  );
}

export default page;
