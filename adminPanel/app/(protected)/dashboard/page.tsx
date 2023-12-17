import prisma from "@/lib/prisma";
import { Button } from "@nextui-org/react";
import { MdOutlineFileDownload } from "react-icons/md";

import Tabs from "./_components/Tabs";
import Cards from "./_components/cards/";
import { RecentSales } from "./_components/RecentSales";
import { GraphOverview } from "./_components/GraphOverview";
import { CalendarDateRangePicker } from "./_components/date-range-picker";

export const metadata = {
  title: "Dashboard",
  description: "Nader Express Dashboard",
};

export default async function Dashboard() {
  const usersCount = await prisma.customer.count();
  const orders = await prisma.order.findMany({
    select: {
      User: { select: { Name: true, Email: true, Image: true } },
      OrderTotal: true,
    },
    orderBy: { createdAt: "desc" },
  });

  let totalRevenue: number = 0;
  orders.map(({ OrderTotal }) => (totalRevenue += OrderTotal));

  const recentSalesData: Array<{
    Name: string;
    Email: string;
    Image: string;
    OrderTotal: number;
  }> = [];
  orders.map(({ OrderTotal, User: { Name, Email, Image } }) =>
    recentSalesData.push({ OrderTotal, Name, Email, Image })
  );
  return (
    <div className="flex-1 space-y-5 mt-5 sm:mt-0">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <CalendarDateRangePicker />
          <Button
            startContent={<MdOutlineFileDownload size={20} />}
            color="primary"
          >
            Download
          </Button>
        </div>
      </div>
      <Tabs />
      <Cards
        totalRevenue={totalRevenue.toString()}
        usersCount={usersCount.toString()}
        ordersCount={orders.length.toString()}
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-4">
          <GraphOverview />
        </div>
        <div className="md:col-span-3">
          <RecentSales data={recentSalesData.slice(0, 7)} />
        </div>
      </div>
    </div>
  );
}
