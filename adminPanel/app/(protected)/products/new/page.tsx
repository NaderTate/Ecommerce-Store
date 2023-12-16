import ProductForm from "@/app/(protected)/products/_components/ProductForm";
import prisma from "@/lib/prisma";
export const metadata = {
  title: "Add new product",
  description: "Add new product",
};
async function page() {
  const categories = await prisma.category.findMany({
    select: { id: true, label: true, value: true, Properties: true },
  });
  return (
    <>
      <div className="font-bold text-xl mb-5 mt-10 sm:mt-0">
        Add new product
      </div>
      <ProductForm allCategories={categories || []} />
    </>
  );
}

export default page;
