import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/registry/new-york/ui/card";

import { CalendarDateRangePicker } from "./_components/date-range-picker";
import { GraphOverview } from "./_components/GraphOverview";
import { RecentSales } from "./_components/recent-sales";
import prisma from "@/lib/prisma";
import Tabs from "./_components/Tabs";
import { Button } from "@nextui-org/react";
import { MdOutlineFileDownload } from "react-icons/md";
import Cards from "./_components/cards/";
export const metadata = {
  title: "Dashboard",
  description: "Nader Express Dashboard",
};
export default async function Dashboard() {
  const usersCount = await prisma.customer.count();
  let totalRevenue: number = 0;
  const orders = await prisma.order.findMany({
    select: {
      User: { select: { Name: true, Email: true, Image: true } },
      OrderTotal: true,
    },
  });
  orders.map(({ OrderTotal }) => (totalRevenue += OrderTotal));
  const orderCount = orders.length;
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
    <>
      <div className="flex-1 space-y-5">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
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
          ordersCount={orderCount.toString()}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <GraphOverview />
          </div>
          <div className="col-span-3">
            <RecentSales data={recentSalesData} />
          </div>
        </div>
      </div>
    </>
  );
}
