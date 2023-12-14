import NavLayout from "@/app/components/NavLayout";
import prisma from "@/lib/prisma";
import CategoryForm from "../_components/CategoryForm";
export async function generateMetadata({ searchParams }: Props) {
  try {
    const id = searchParams.id;
    const categoryInfo = await prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        label: true,
        Image: true,
      },
    });
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
type Props = {
  searchParams: {
    id: string;
  };
};
async function page({ searchParams }: Props) {
  const id = searchParams.id;
  const categoryInfo = await prisma.category.findUnique({
    where: { id },
    select: {
      id: true,
      label: true,
      value: true,
      Image: true,
      Properties: true,
      ParentId: true,
    },
  });
  const allCategories = await prisma.category.findMany({
    select: { id: true, label: true, value: true, Properties: true },
  });

  return (
    <div>
      <NavLayout>
        <div className="font-bold text-xl mb-5">Edit</div>
        {categoryInfo && (
          <CategoryForm category={categoryInfo} allCategories={allCategories} />
        )}
      </NavLayout>
    </div>
  );
}

export default page;
