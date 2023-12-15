import React from "react";
import prisma from "@/lib/prisma";
import ReviewCard from "@/app/(protected)/reviews/_components/ReviewCard";
export const metadata = {
  title: "Reviews",
  description: "Newest reviews",
};
async function page({ searchParams }: any) {
  const sk = searchParams.page || 1;
  const itemsToShow = 30;
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
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
  });
  return (
    <div>
      <p className="my-5">
        Displaying {(sk - 1) * itemsToShow}-
        {(count - (sk - 1) * itemsToShow) / itemsToShow > 1
          ? sk * itemsToShow
          : count}{" "}
        of {count} reviews
      </p>
      <div className="space-y-5">
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
    </div>
  );
}

export default page;
