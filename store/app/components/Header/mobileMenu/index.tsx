import Image from "next/image";
import SearchModal from "../SearchModal";
import ThemeSwitch from "../ThemeSwitch";
import UserAvatar from "../UserAvatar";

type Props = {};
const MobileMenu = ({}: Props) => {
  return (
    <div className="flex justify-between items-center fixed top-0 z-20 backdrop-blur-md w-[95vw] ">
      <Image src={"/logo.webp"} width={35} height={35} alt={"logo"} />
      <div className="flex gap-3 items-center">
        <SearchModal />
        <ThemeSwitch />
        <UserAvatar />
      </div>
    </div>
  );
};

export default MobileMenu;
