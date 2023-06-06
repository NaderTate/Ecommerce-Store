import NavLayout from "@/app/components/NavLayout";
import ProductForm from "@/app/components/ProductForm";

function page() {
  return (
    <NavLayout>
      <div className="font-bold text-xl mb-5">Add new product</div>
      <ProductForm />
    </NavLayout>
  );
}

export default page;
