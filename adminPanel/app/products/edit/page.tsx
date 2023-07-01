import NavLayout from "@/app/components/NavLayout";
import ProductForm from "@/app/components/ProductForm";
import { getProductById } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import { createProductAction, updateProductAction } from "@/app/_actions";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
async function page({ searchParams }: any) {
  const id = searchParams.id;
  const productInfo = await prisma.product.findUnique({
    where: { id },
    include: { Categories: true },
  });
  // const { categories } = await getCategories(1, 99999);/
  const categories = await prisma.category.findMany({
    select: { id: true, label: true, value: true, Properties: true },
  });
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
            }}
            allCategories={categories}
            {...productInfo}
          />
        )}
      </NavLayout>
    </div>
  );
}
export default page;
