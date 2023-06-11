import NavLayout from "@/app/components/NavLayout";
import ProductForm from "@/app/components/ProductForm";
import { getCategories } from "@/lib/categories";
import { createProductAction, updateProductAction } from "@/app/_actions";
import { revalidatePath } from "next/cache";
async function page() {
  const { categories } = await getCategories(1, 99);
  return (
    <NavLayout>
      <div className="font-bold text-xl mb-5">Add new product</div>
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
      />
    </NavLayout>
  );
}

export default page;
