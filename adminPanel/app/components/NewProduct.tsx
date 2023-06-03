"use client";

import { useState, useEffect } from "react";
import { createProductAction } from "@/app/_actions";

const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [missing, setMissing] = useState(true);
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (title == "" || !title) {
      setMissing(true);
    } else {
      setMissing(false);
    }
  }, [title]);
  async function action() {
    setLoading(true);
    await createProductAction(
      title,
      69,
      [],
      "des",
      [{ title: "Rev1" }],
      ["cat1"],
      ["Ass"]
    );
    setTitle("");
    setLoading(false);
  }
  return (
    <form>
      <h2 className="mb-2 font-medium">Create a New Todo</h2>
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        type="text"
        name="title"
        className="rounded border border-slate-400 px-2 py-0.5"
      />
      <button
        disabled={missing}
        onClick={action}
        type="button"
        className={`"ml-2 rounded bg-slate-700 px-2 py-1 text-sm text-white disabled:bg-opacity-50 ${
          missing && "cursor-not-allowed"
        }`}
      >
        {loading ? "Adding" : "Add"}
      </button>
    </form>
  );
};

export default NewProduct;
