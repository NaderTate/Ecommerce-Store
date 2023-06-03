import NavLayout from "@/app/components/NavLayout";
import ProductForm from "@/app/components/ProductForm";
import { getProductById } from "@/lib/products";
async function page({ searchParams }) {
  const id = searchParams.id;
  const productInfo = await getProductById(id);
  // console.log(productInfo);

  return (
    <div>
      <NavLayout>
        <div className="font-bold text-xl mb-5">Edit</div>
        {productInfo && <ProductForm {...productInfo.product} />}
      </NavLayout>
    </div>
  );
}

export default page;
