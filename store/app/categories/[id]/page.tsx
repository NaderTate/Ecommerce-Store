import { prisma } from "@/lib/prisma";
import Main from "./Main";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  try {
    const categoryInfo = await prisma.category.findUnique({
      where: { id },
      select: {
        Image: true,
        label: true,
      },
    });

    return {
      title: "Shop for " + categoryInfo?.label + " products" || "Nader Express",
      description: "Nader Express",
      twitter: {
        card: "summary_large_image",
        site: "@naderexpress",
        title: "Shop for " + id + " products" || "Nader Express",
        description: "Nader Express",
        images: [
          {
            url:
              categoryInfo?.Image ||
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687293658/Nader%20Express/Frame_1_utki4s.svg",
            width: 800,
            height: 600,
          },
        ],
      },
      openGraph: {
        title:
          "Shop for " + categoryInfo?.label + " products" || "Nader Express",
        images: [
          {
            url:
              categoryInfo?.Image ||
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687293658/Nader%20Express/Frame_1_utki4s.svg",
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Not found",
      description: "This page does not exist",
    };
  }
}
async function page({ params: { id } }: { params: { id: string } }) {
  return (
    <div className="px-10">
      <Main categoryId={id} />
    </div>
  );
}

export default page;
