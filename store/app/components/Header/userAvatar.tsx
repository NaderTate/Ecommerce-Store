import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { LuPackageOpen } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useUser } from "@clerk/nextjs";

type props = {};
function UserAvatar({}: props) {
  const { user } = useUser();

  return (
    <div>
      <Dropdown
        placement="bottom-end"
        className="bg-background shadow-md shadow-blue-600/10"
      >
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="primary"
            name={user?.firstName || "User"}
            size="sm"
            src={
              user?.profileImageUrl ||
              `https://ui-avatars.com/api/?name=${user?.fullName}`
            }
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">
              {user?.primaryEmailAddress?.emailAddress || "User"}
            </p>
          </DropdownItem>
          <DropdownItem
            as={Link}
            href="/account"
            startContent={<FaUserCircle />}
            key="account"
          >
            Account
          </DropdownItem>
          <DropdownItem
            as={Link}
            href="/cart"
            startContent={<MdOutlineShoppingCart />}
            key="cart"
          >
            Cart
          </DropdownItem>
          <DropdownItem
            as={Link}
            href="/whishlist"
            startContent={<FaRegHeart />}
            key="whishlist"
          >
            Whishlist
          </DropdownItem>
          <DropdownItem
            as={Link}
            href="/orders"
            startContent={<LuPackageOpen />}
            key="orders"
          >
            Orders
          </DropdownItem>
          <DropdownItem
            startContent={<RiLogoutCircleLine />}
            key="logout"
            color="danger"
          >
            <SignOutButton
              children={<button className="w-full text-left">Sign Out</button>}
            />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default UserAvatar;
