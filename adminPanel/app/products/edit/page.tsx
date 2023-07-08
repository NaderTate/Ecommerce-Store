import NavLayout from "@/app/components/NavLayout";
import ProductForm from "@/app/components/ProductForm";
import prisma from "@/lib/prisma";
export async function generateMetadata({ searchParams }: any) {
  try {
    const id = searchParams.id;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { Categories: true },
    });
    if (!product)
      return { title: "Not found", description: "This product does not exist" };
    return {
      title: product?.Title,
      description: product?.Description,
      alternates: {
        canonical: `products/${product?.id}`,
      },
      twitter: {
        card: "summary_large_image",
        site: "@naderexpress",
        title: product?.Title,
        description: product?.Description,
        images: [product?.mainImg || ""],
      },
      openGraph: {
        title: product?.Title,
        images: [
          {
            url: product?.mainImg || "",
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
  const productInfo = await prisma.product.findUnique({
    where: { id },
    include: { Categories: true },
  });
  const categories = await prisma.category.findMany({
    select: { id: true, label: true, value: true, Properties: true },
  });
  return (
    <div>
      <NavLayout>
        <div className="font-bold text-xl mb-5">Edit</div>
        {productInfo && (
          <ProductForm allCategories={categories} {...productInfo} />
        )}
      </NavLayout>
    </div>
  );
}
export default page;
