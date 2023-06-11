import NavLayout from "@/app/components/NavLayout";
import ProductForm from "@/app/components/ProductForm";
import { getProductById } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import { createProductAction, updateProductAction } from "@/app/_actions";
import { revalidatePath } from "next/cache";
async function page({ searchParams }: any) {
  const id = searchParams.id;
  const productInfo = await getProductById(id);
  const { categories } = await getCategories(1, 99999);
  return (
    <div>
      <NavLayout>
        <div className="font-bold text-xl mb-5">Edit</div>
        {productInfo && (
          <ProductForm
            createProduct={async ({
              Title,
              Price,
              Images,
              mainImg,
              Description,
              Reviews,
              Categories,
              Colors,
              Properties,
            }: {
              Title: string;
              Price: number;
              Images: Array<object>;
              mainImg: string;
              Description: string;
              Reviews: Array<object>;
              Categories: Array<string>;
              Colors: Array<string>;
              Properties: object;
            }) => {
              "use server";
              await createProductAction(
                Title,
                Price,
                Images,
                mainImg,
                Description,
                Reviews,
                Categories,
                Colors,
                Properties
              );
              revalidatePath("/products");
            }}
            updateProduct={async ({
              id,
              Title,
              Price,
              Images,
              mainImg,
              Description,
              Reviews,
              Categories,
              Colors,
              Properties,
            }: {
              id: string;
              Title: string;
              Price: number;
              Images: Array<object>;
              mainImg: string;
              Description: string;
              Reviews: Array<object>;
              Categories: Array<string>;
              Colors: Array<string>;
              Properties: object;
            }) => {
              "use server";
              await updateProductAction(
                id,
                Title,
                Price,
                Images,
                mainImg,
                Description,
                Reviews,
                Categories,
                Colors,
                Properties
              );
              revalidatePath("/products");
            }}
            allCategories={categories}
            {...productInfo.product}
          />
        )}
      </NavLayout>
    </div>
  );
}
export default page;
