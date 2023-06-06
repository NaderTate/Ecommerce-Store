import NavLayout from "@/app/components/NavLayout";
import Categories from "@/app/components/Categories";
import { getCategoryById, getCategories } from "@/lib/categories";

async function page({ searchParams }: any) {
  const id = searchParams.id;
  const categoryInfo = await getCategoryById(id);
  const { categories } = await getCategories(1, 99);
  // console.log(categories);

  return (
    <div>
      <NavLayout>
        <div className="font-bold text-xl mb-5">Edit</div>
        {categoryInfo?.category && (
          <Categories
            category={categoryInfo?.category}
            allCategories={categories}
          />
        )}
      </NavLayout>
    </div>
  );
}

export default page;
