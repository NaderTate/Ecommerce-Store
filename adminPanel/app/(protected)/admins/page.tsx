import AdminCard from "./_components/AdminCard";
import prisma from "@/lib/prisma";
export const metadata = {
  title: "Admins",
  description: "Manage nader express admins",
};
async function page({ searchParams }: any) {
  const itemsToShow = 30;
  const sk = searchParams.page || 1;
  const search = searchParams.search ? searchParams.search : "";
  const admins = await prisma.admin.findMany({
    where: {
      Name: {
        contains: search,
        mode: "insensitive",
      },
    },
    skip: (sk - 1) * itemsToShow,
    take: itemsToShow,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      Name: true,
      Email: true,
      Image: true,
    },
  });
  const count = await prisma.admin.count({
    where: {
      Name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return (
    <>
      <div className="flex flex-col min-h-[90vh]">
        {/* New admin button */}
        <p className="mt-5">
          Displaying {(sk - 1) * itemsToShow}-
          {(count - (sk - 1) * itemsToShow) / itemsToShow > 1
            ? sk * itemsToShow
            : count}{" "}
          of {count} admins
        </p>
        <div className="grow">
          <div className="flex flex-wrap gap-5 mt-5">
            {admins?.map((admin) => {
              return <AdminCard key={admin?.id} admin={admin} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
