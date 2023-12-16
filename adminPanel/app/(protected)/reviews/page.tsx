import prisma from "@/lib/prisma";
import ReviewCard from "@/app/(protected)/reviews/_components/ReviewCard";
import ContentCountDisplay from "@/app/components/ContentCountDisplay";
import { itemsPerPage } from "@/lib/global_variables";
import Pagination from "@/app/components/Pagination";
export const metadata = {
  title: "Reviews",
  description: "Newest reviews",
};
async function page({ searchParams }: any) {
  const pageNumber = searchParams.page || 1;
  const count = await prisma.review.count();
  const reviews = await prisma.review.findMany({
    orderBy: { id: "desc" },
    select: {
      Rating: true,
      Comment: true,
      createdAt: true,
      Product: { select: { mainImg: true, id: true } },
      User: { select: { Name: true, Image: true, id: true } },
    },
    take: itemsPerPage,
    skip: (pageNumber - 1) * itemsPerPage,
  });
  return (
    <div className="mt-10 sm:mt-0">
      <ContentCountDisplay
        count={count}
        content="reviews"
        itemsToShow={itemsPerPage}
        pageNumber={pageNumber}
      />
      <div className="flex flex-wrap gap-5">
        {reviews.map(
          ({ Product: { mainImg, id }, Rating, Comment, User, createdAt }) => {
            return (
              <ReviewCard
                key={id}
                id={id}
                Date={createdAt}
                mainImg={mainImg}
                Rating={Rating}
                Comment={Comment}
                User={{ Name: User.Name, Img: User.Image, id: User.id }}
              />
            );
          }
        )}
      </div>
      <Pagination page="reviews" total={Math.ceil(count / itemsPerPage)} />
    </div>
  );
}

export default page;
