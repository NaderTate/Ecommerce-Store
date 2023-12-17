"use client";
import { Input } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";
type Props = {
  page: "products" | "users" | "categories" | "admins";
};

const SearchInput = ({ page }: Props) => {
  const [searchKeywords, setSearchKeywords] = useState("");
  const router = useRouter();
  const handleSubmit = () => {
    router.push(`/${page}?search=${searchKeywords}`);
  };
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <Input
      className="w-64 ml-10 sm:ml-0"
      variant="bordered"
      label="Search..."
      value={searchKeywords}
      onValueChange={setSearchKeywords}
      endContent={
        <IoSearch
          className="m-auto cursor-pointer"
          size={20}
          onClick={handleSubmit}
        />
      }
      onKeyDown={handleKeyPress}
    />
  );
};

export default SearchInput;
