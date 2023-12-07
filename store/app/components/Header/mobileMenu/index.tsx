import Image from "next/image";
import Search from "../Search";
import ThemeButton from "../ThemeButton";
import UserAvatar from "../userAvatar";

type Props = {};
const MobileMenu = (props: Props) => {
  return (
    <div className="flex justify-between items-center fixed top-0 right-5 z-20 backdrop-blur-md w-[85vw] ">
      <Image src={"/logo.webp"} width={35} height={35} alt={"logo"} />
      <div className="flex gap-3 items-center">
        <Search />
        <ThemeButton />
        <UserAvatar />
      </div>
    </div>
  );
};

export default MobileMenu;
