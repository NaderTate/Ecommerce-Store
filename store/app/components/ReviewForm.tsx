"use client";
import React, { useState } from "react";
import { addReviewAction } from "../_actions";
import {
  FaRegAngry,
  FaRegMeh,
  FaRegSmile,
  FaRegGrinHearts,
} from "react-icons/fa";
import { BiSad } from "react-icons/bi";
function ReviewForm({
  UserId,
  ProductId,
}: {
  UserId: string;
  ProductId: string;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  return (
    <div>
      <div className="flex gap-2 items-center my-2">
        <FaRegAngry
          className="hover:fill-[#FFFF00] cursor-pointer"
          fill={`${rating == 1 ? "yellow" : "white"}`}
          onClick={() => {
            setRating(1);
          }}
          size={25}
        />
        <BiSad
          onClick={() => {
            setRating(2);
          }}
          className="hover:fill-[#FFFF00] cursor-pointer"
          fill={`${rating == 2 ? "yellow" : "white"}`}
          size={30}
        />
        <FaRegMeh
          onClick={() => {
            setRating(3);
          }}
          className="hover:fill-[#FFFF00] cursor-pointer"
          fill={`${rating == 3 ? "yellow" : "white"}`}
          size={25}
        />
        <FaRegSmile
          onClick={() => {
            setRating(4);
          }}
          className="hover:fill-[#FFFF00] cursor-pointer"
          fill={`${rating == 4 ? "yellow" : "white"}`}
          size={25}
        />
        <FaRegGrinHearts
          onClick={() => {
            setRating(5);
          }}
          className="hover:fill-[#FFFF00] cursor-pointer"
          fill={`${rating == 5 ? "yellow" : "white"}`}
          size={25}
        />
        {rating > 0 && <span>{rating}/5</span>}
      </div>
      <textarea
        name="comment"
        id="comment"
        rows={7}
        placeholder="Type your review"
        className="w-full p-5 rounded-md md:w-3/4 lg:w-2/3"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></textarea>
      <button
        className="block bg-blue-700 rounded-md w-24 font-semibold tracking-wider py-2 text-white"
        onClick={() => {
          addReviewAction(UserId, ProductId, rating, comment);
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default ReviewForm;
