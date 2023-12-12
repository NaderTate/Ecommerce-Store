import Image from "next/image";
import SearchModal from "../SearchModal";
import ThemeSwitch from "../ThemeSwitch";
import UserDropdown from "../UserDropdown";

type Props = {};
const MobileMenu = ({}: Props) => {
  return (
    <div className="flex justify-between items-center fixed top-0 z-20 backdrop-blur-md w-[95vw] ">
      <Image src={"/logo.webp"} width={35} height={35} alt={"logo"} />
      <div className="flex gap-3 items-center">
        <SearchModal />
        <ThemeSwitch />
        <UserDropdown />
      </div>
    </div>
  );
};

export default MobileMenu;
