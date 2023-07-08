import { prisma } from "@/lib/prisma";
export default async function getSitemap() {
  const baseUrl = "https://www.naderexpress.vercel.app";
  const products = await prisma.product.findMany({
    select: {
      Title: true,
    },
  });
  const productsUrls =
    products.map((product) => {
      return {
        url: `${baseUrl}/product/${product.Title}`,
        changefreq: "weekly",
        priority: 0.7,
        lastModified: new Date().toISOString(),
      };
    }) ?? [];
  const categories = await prisma.category.findMany({
    select: {
      label: true,
    },
  });
  const categoriesUrls =
    categories.map((category) => {
      return {
        url: `${baseUrl}/category/${category.label}`,
        changefreq: "weekly",
        priority: 0.7,
        lastModified: new Date().toISOString(),
      };
    }) ?? [];
  return [
    {
      url: baseUrl,
      changefreq: "weekly",
      priority: 1,
      lastModified: new Date().toISOString(),
    },
    ...productsUrls,
    ...categoriesUrls,
  ];
}
