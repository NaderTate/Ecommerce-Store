"use client";
import React, { useState } from "react";
import { addToCartAction, addToFavoritesAction } from "../_actions";
import RiseLoader from "react-spinners/RiseLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { BiShare } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import ShareIcons from "./ShareIcons";
import Link from "next/link";
function BuyOptions({
  userId,
  id,
  favorites,
  mainImg,
  title,
}: {
  userId: string;
  id: string;
  favorites?: Array<any>;
  mainImg: string;
  title: string;
}) {
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingFavs, setLoadingFavs] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const favsArray: Array<string> = [];
  favorites?.map(({ id }: { id: string }) => {
    favsArray.push(id);
  });
  const buttonStyle =
    "w-full sm:w-56 h-12 rounded-md cursor-pointer font-bold text-white ";

  return (
    <div>
      {userId && (
        <div>
          <div className="sm:flex-row flex flex-col gap-5 sm:gap-10">
            <button
              onClick={async () => {
                setLoadingCart(true);
                await addToCartAction(userId, { id });
                setLoadingCart(false);
              }}
              className={buttonStyle + " bg-blue-700"}
            >
              {loadingCart ? (
                <RiseLoader color="#ffffff" size={7} />
              ) : (
                "Add to cart"
              )}
            </button>
            <Link href={{ pathname: "/checkout", query: { productId: id } }}>
              <button className={buttonStyle + " bg-blue-950"}>Buy now</button>
            </Link>
          </div>
          <div className="flex gap-5 mt-5 justify-center sm:justify-start">
            <div
              onClick={() => {
                setShowShare(!showShare);
              }}
              className="flex gap-3 w-24 rounded-md dark:bg-gray-200/70 bg-black/50 text-white dark:text-black font-bold h-10 items-center justify-center cursor-pointer"
            >
              <BiShare size={50} className="w-6" />
              Share
            </div>
            <div
              aria-disabled={loadingFavs}
              onClick={async () => {
                setLoadingFavs(true);
                await addToFavoritesAction(userId, { id });
                setLoadingFavs(false);
              }}
              className="w-24 rounded-md dark:bg-gray-200/70 bg-black/50 text-black font-bold h-10 items-center flex  justify-center cursor-pointer"
            >
              {loadingFavs ? (
                <ClipLoader color="#ffffff" size={20} />
              ) : favsArray.includes(id) ? (
                <AiFillHeart size={35} fill="red" />
              ) : (
                <AiFillHeart size={30} fill="white" />
              )}
            </div>
          </div>
          {showShare && <ShareIcons title={title} mainImg={mainImg} />}
        </div>
      )}
    </div>
  );
}

export default BuyOptions;
