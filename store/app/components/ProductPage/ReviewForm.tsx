"use client";
import React, { useState } from "react";
import { addReviewAction } from "../../_actions";
import {
  FaRegAngry,
  FaRegMeh,
  FaRegSmile,
  FaRegGrinHearts,
} from "react-icons/fa";
import { BiSad } from "react-icons/bi";
import { Button, Textarea } from "@nextui-org/react";
function ReviewForm({
  UserId,
  ProductId,
}: {
  UserId: string;
  ProductId: string;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
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
      <Textarea
        label="Type your review"
        className=" md:w-3/4 lg:w-2/3 my-2"
        onValueChange={setComment}
      />
      <Button
        color="primary"
        isLoading={loading}
        isDisabled={loading || comment.length < 2}
        onPress={async () => {
          setLoading(true);
          addReviewAction(UserId, ProductId, rating, comment);
          setLoading(false);
        }}
      >
        Submit
      </Button>
    </div>
  );
}

export default ReviewForm;
