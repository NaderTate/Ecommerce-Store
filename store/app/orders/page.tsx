import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Orders from "../components/Orders";
type Props = {};

const page = async (props: Props) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in?redirectURL=wishlist");
  const orders = await prisma.order.findMany({
    where: { UserId: userId },
    include: {
      Products: {
        include: {
          Product: {
            select: {
              id: true,
              Title: true,
              Price: true,
              mainImg: true,
              secondImage: true,
            },
          },
        },
      },
      Address: true,
    },
    orderBy: { createdAt: "desc" },
    cacheStrategy: { ttl: 60 },
  });
  return (
    <div className="px-5 sm:px-10 mt-20">
      <Orders orders={orders} />
    </div>
  );
};

export default page;
