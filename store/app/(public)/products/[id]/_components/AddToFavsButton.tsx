"use client";

import { useState } from "react";
import { SignInButton } from "@clerk/nextjs";

import { FaHeart } from "react-icons/fa";

import { addToWishlist } from "@/actions/wishlist";

type Props = {
  productID: string;
  userID: string | null;
  isFav: boolean;
};

const AddToFavsButton = ({ productID, userID, isFav }: Props) => {
  const [isFavorite, setIsFavorite] = useState(isFav);

  return (
    <>
      {userID ? (
        <FaHeart
          size={25}
          className={`cursor-pointer transition-colors ${
            isFavorite ? " fill-red-500" : " fill-black dark:fill-white"
          }`}
          onClick={async () => {
            setIsFavorite(!isFavorite);
            const res = await addToWishlist(productID, userID);
            if (res.added) {
              setIsFavorite(true);
            }
            if (res.deleted) {
              setIsFavorite(false);
            }
          }}
        />
      ) : (
        <SignInButton>
          <FaHeart className="text-2xl cursor-pointer" />
        </SignInButton>
      )}
    </>
  );
};

export default AddToFavsButton;
