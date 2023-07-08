import NavLayout from "@/app/components/NavLayout";
import Categories from "@/app/components/Categories";
import { getCategoryById, getCategories } from "@/lib/categories";
import { createCategoryAction, updataCategoryAction } from "../../_actions";
import { revalidatePath } from "next/cache";
export async function generateMetadata({ searchParams }: any) {
  try {
    const id = searchParams.id;
    const categoryInfo = (await getCategoryById(id)).category;
    if (!categoryInfo)
      return {
        title: "Not found",
        description: "This category does not exist",
      };

    return {
      title: categoryInfo?.label,
      alternates: {
        canonical: `categories/${categoryInfo?.id}`,
      },
      twitter: {
        card: "summary_large_image",
        site: "@naderexpress",
        title: categoryInfo?.label,
        images: [categoryInfo?.Image || ""],
      },
      openGraph: {
        title: categoryInfo?.label,
        images: [
          {
            url: categoryInfo?.Image || "",
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Not found",
      description: "This product does not exist",
    };
  }
}
async function page({ searchParams }: any) {
  const id = searchParams.id;
  const categoryInfo = await getCategoryById(id);
  const { categories } = await getCategories(1, 99);

  return (
    <div>
      <NavLayout>
        <div className="font-bold text-xl mb-5">Edit</div>
        {categoryInfo?.category && (
          <Categories
            createCategory={async ({
              label,
              Image,
              Properties,
              Parent,
            }: {
              label: string;
              Image: string;
              Properties: any;
              Parent: string;
            }) => {
              "use server";
              await createCategoryAction(label, Image, Properties, Parent);
              revalidatePath("/categories");
            }}
            updateCategory={async ({
              id,
              label,
              Image,
              Properties,
              Parent,
            }: {
              id: string;
              label: string;
              Image: string;
              Properties: any;
              Parent: string;
            }) => {
              "use server";
              await updataCategoryAction(id, label, Image, Properties, Parent);
              revalidatePath("/categories");
            }}
            category={categoryInfo?.category}
            allCategories={categories}
          />
        )}
      </NavLayout>
    </div>
  );
}

export default page;
