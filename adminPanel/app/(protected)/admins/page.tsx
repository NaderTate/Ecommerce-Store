import prisma from "@/lib/prisma";

import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import ContentCountDisplay from "@/components/ContentCountDisplay";

import AdminCard from "./_components/AdminCard";
import AdminForm from "./_components/AdminForm";

import { itemsPerPage } from "@/lib/global_variables";
export const metadata = {
  title: "Admins",
  description: "Manage nader express admins",
};
type Props = {
  searchParams: {
    page?: number;
    search?: string;
  };
};
async function page({ searchParams }: Props) {
  const pageNumber = searchParams.page || 1;
  const search = searchParams.search ?? "";
  const admins = await prisma.admin.findMany({
    where: {
      Name: {
        contains: search,
        mode: "insensitive",
      },
    },
    skip: (pageNumber - 1) * itemsPerPage,
    take: itemsPerPage,
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
    <div className="flex flex-col min-h-[90vh]">
      <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-5">
        <AdminForm />
        <SearchInput page="admins" />
      </div>
      <ContentCountDisplay
        content="admins"
        count={count}
        itemsToShow={itemsPerPage}
        pageNumber={pageNumber}
        className="mt-5"
      />
      <div className="grow">
        <div className="flex flex-wrap gap-5">
          {admins?.map((admin) => {
            return <AdminCard key={admin?.id} admin={admin} />;
          })}
        </div>
      </div>
      <Pagination
        page="admins"
        total={Math.ceil(count / itemsPerPage)}
        queries={{ search }}
      />
    </div>
  );
}

export default page;
