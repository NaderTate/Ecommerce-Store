"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";
import { Image as NextUIImage } from "@nextui-org/image";

import ProductCard from "../ProductCard";

import { PiMagnifyingGlassBold } from "react-icons/pi";

import { useFetchSearchResults } from "./utils";

function SearchModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    searchTerms,
    searchResults,
    resetSearchResults,
    handleInputChange,
    loading,
  } = useFetchSearchResults();

  const router = useRouter();
  router.prefetch("/search");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchTerms.length < 2) return;
      onOpenChange();
      router.push(`/search?s=${searchTerms}`);
      resetSearchResults();
    }
  };

  return (
    <>
      <PiMagnifyingGlassBold
        onClick={onOpen}
        size={25}
        className="cursor-pointer"
      />
      <Modal
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
      >
        <ModalContent className="p-2 max-h-[95vh] overflow-auto">
          <ModalBody>
            <Input
              onKeyDown={handleKeyDown}
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
            {loading && <Spinner />}
            {searchResults?.products?.length > 0 && (
              <>
                <h1 className="text-center mb-3">products</h1>
                <div className="flex flex-wrap justify-center gap-5 ">
                  {searchResults?.products?.map((product) => {
                    return (
                      <div
                        key={product.id}
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
              </>
            )}
            {searchResults.categories.length > 0 && (
              <>
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
                          alt={category.label}
                        />
                        <h1 className="text-center">{category.label}</h1>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SearchModal;
