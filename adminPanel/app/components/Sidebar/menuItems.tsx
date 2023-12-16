import { GrUserAdmin } from "react-icons/gr";
import { FaChartLine } from "react-icons/fa";
import { BsBoxes } from "react-icons/bs";
import { PiCurrencyDollarBold, PiUsersThreeBold } from "react-icons/pi";
import { BiCategoryAlt, BiCommentDetail } from "react-icons/bi";
export const menuItems: Array<{
  label: string;
  url: string;
  icon: React.ReactNode;
}> = [
  {
    label: "Dashboard",
    url: "/dashboard",
    icon: <FaChartLine />,
  },
  {
    label: "Products",
    url: "/products",
    icon: <BsBoxes />,
  },
  {
    label: "Categories",
    url: "/categories",

    icon: <BiCategoryAlt />,
  },
  {
    label: "Orders",
    url: "/orders",
    icon: <PiCurrencyDollarBold />,
  },
  {
    label: "Reviews",
    url: "/reviews",
    icon: <BiCommentDetail />,
  },
  {
    label: "Admins",
    url: "/admins",

    icon: <GrUserAdmin />,
  },
  {
    label: "Users",
    url: "/users",
    icon: <PiUsersThreeBold />,
  },
];
