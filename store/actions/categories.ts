"use server";
import { prisma } from "@/lib/prisma";

// get the latest categries
export const getLatestCategories = async (limit?: number) => {
  const categories = await prisma.category.findMany({
    take: limit ? limit : 10,
    select: {
      id: true,
      label: true,
      Image: true,
    },
  });
  return categories;
};

// This function finds similar categories to the current one.
// for example, if the current category is "laptops", it will return "mobiles", "power banks", "tablets", etc...
// This is used in the "Discover more" section in the sidebar.
// It can take either a categoryId or a search keyword as a query.
export const getSimilarCategories = async (query: {
  categoryId?: string;
  searchQuery?: string;
}) => {
  // Initialize the array that will hold the similar categories.
  let similarCategories: Array<{ id: string; label: string }> = [];
  let id: string | undefined = query.categoryId;
  if (query.searchQuery) {
    // If we provide a search keyword, we find the first category that matches that keyword and get its id.
    const category = await prisma.category.findFirst({
      where: {
        label: { contains: query.searchQuery, mode: "insensitive" },
      },
      select: {
        id: true,
      },
    });
    id = category?.id;
  }
  // The idea behind this is to get the category info, if this category is a parent, then get all of it's children, if it's a child, then get all of it's siblings.
  if (!id) return similarCategories;
  const categoryData = await prisma.category.findUnique({
    where: { id },
    select: {
      id: true,
      label: true,
      Parent: {
        select: {
          children: { select: { id: true, label: true } },
          label: true,
          id: true,
        },
      },
      children: { select: { id: true, label: true } },
      ParentId: true,
    },
  });

  // If the category has a parent, then it's a child, so we push the parent and all of it's children to the array.
  if (categoryData?.Parent) {
    similarCategories.push({
      id: categoryData.Parent?.id,
      label: categoryData.Parent?.label,
    });
    categoryData.Parent?.children.map(({ id, label }) =>
      similarCategories.push({ id, label })
    );
  }
  // If it doesn't have a parent, then it's a parent, so we push it and all of it's children to the array.
  else {
    similarCategories.push({
      id: categoryData?.id as string,
      label: categoryData?.label as string,
    });
    categoryData?.children.map(({ id, label }) =>
      similarCategories.push({ id, label })
    );
  }
  return similarCategories;
};
