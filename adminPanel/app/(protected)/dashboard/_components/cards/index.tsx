import { CiCreditCard1 } from "react-icons/ci";
import Card from "./Card";
import { FiActivity, FiUsers } from "react-icons/fi";
import { currencySymbol } from "@/lib/global_variables";

type Props = { totalRevenue: string; usersCount: string; ordersCount: string };

const Cards = ({ totalRevenue, usersCount, ordersCount }: Props) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      <Card
        label="Total Revenue"
        icon={currencySymbol}
        value={totalRevenue}
        percentage="+20.1 from last month"
      />
      <Card
        label="Users"
        icon={<FiUsers />}
        value={usersCount}
        percentage="+180.1% from last month"
      />
      <Card
        label="Orders"
        icon={<CiCreditCard1 />}
        value={ordersCount}
        percentage="+19% from last month"
      />
      <Card
        label="Active now"
        icon={<FiActivity />}
        value={"573"}
        percentage="+201 since last hour"
      />
    </div>
  );
};

export default Cards;
