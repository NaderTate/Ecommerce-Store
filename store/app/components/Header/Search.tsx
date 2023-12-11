"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Image as NextUIImage } from "@nextui-org/image";
import Image from "next/image";
import { search } from "@/app/server_actions/products";
import { Spinner } from "@nextui-org/spinner";
import Link from "next/link";
import { debounce } from "lodash";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import ProductCard from "../ProductCard";

function Search() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{
    products: {
      Title: string;
      id: string;
      mainImg: string;
      secondImage: string;
      Price: number;
    }[];
    categories: { label: string; Image: string; id: string }[];
  }>({ products: [], categories: [] });
  const router = useRouter();
  const resetSearchResults = () => {
    setSearchResults({ products: [], categories: [] });
  };
  const debouncedSearch = debounce(async (searchQuery: string) => {
    // Make your Prisma query here and update the UI
    if (searchQuery.length < 2) return;
    setLoading(true);
    const data = await search(searchQuery);
    // Update the UI with the search results
    setSearchResults(data);
    setLoading(false);
  }, 500);
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const searchQuery = event.target.value;
    if (searchQuery.length < 2) resetSearchResults();
    setSearchTerms(searchQuery);
    resetSearchResults();
    debouncedSearch(searchQuery);
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchTerms.length < 2) return;
      onOpenChange();
      router.push(`/search?s=${searchTerms}`);
      resetSearchResults();
    }
  };
  return (
    <div>
      <div onClick={onOpen}>
        <PiMagnifyingGlassBold size={25} className="cursor-pointer" />
      </div>
      <Modal
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
      >
        <ModalContent className="p-2 max-h-[95vh] overflow-auto">
          <ModalBody>
            <div className="relative mt-5" onKeyDown={handleKeyDown}>
              <Input
                onChange={handleInputChange}
                label="search any thing..."
                autoFocus
                endContent={
                  <PiMagnifyingGlassBold
                    className="cursor-pointer"
                    size={22}
                    onClick={() => {
                      if (searchTerms.length < 2) return;
                      onOpenChange();
                      router.push(`/search?search=${searchTerms}`);
                      resetSearchResults();
                    }}
                  />
                }
              />
            </div>
            {loading && <Spinner />}
            {searchResults?.products?.length > 0 && (
              <div>
                <h1 className="text-center mb-3">products</h1>
                <div className="flex flex-wrap justify-center gap-5 ">
                  {searchResults?.products?.map((product) => {
                    return (
                      <div
                        className="w-36"
                        onClick={() => {
                          onOpenChange();
                          resetSearchResults();
                        }}
                      >
                        <ProductCard product={product} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {searchResults.categories.length > 0 && (
              <div>
                <h1 className="text-center mb-3">categories</h1>
                <div className="flex flex-wrap justify-center gap-5">
                  {searchResults.categories.map((category) => {
                    return (
                      <Link
                        href={{ pathname: `/categories/${category.id}` }}
                        key={category.id}
                        onClick={() => {
                          onOpenChange();
                          resetSearchResults();
                        }}
                      >
                        <NextUIImage
                          as={Image}
                          width={135}
                          height={135}
                          className="object-contain rounded-md"
                          src={category?.Image}
                          alt=""
                        />
                        <h1 className="text-center">{category.label}</h1>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Search;
