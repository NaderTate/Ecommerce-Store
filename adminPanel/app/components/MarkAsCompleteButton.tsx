"use client";
import React, { useState } from "react";
import { markAsCompleteAction } from "../_actions";
import BeatLoader from "react-spinners/BeatLoader";
function MarkAsCompleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={async () => {
        setLoading(true);
        await markAsCompleteAction(id);
        setLoading(false);
      }}
      className="rounded-md bg-slate-300 text-black px-3 py-1 font-semibold w-52"
    >
      {loading ? <BeatLoader color="#36d7b7" size={9} /> : "Mark as complete"}
    </button>
  );
}

export default MarkAsCompleteButton;
