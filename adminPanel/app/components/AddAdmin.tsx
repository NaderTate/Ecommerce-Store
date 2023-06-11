"use client";
import React from "react";
import { useState } from "react";
import { RiseLoader } from "react-spinners";
import { createAdminAction } from "../_actions";
function Categories() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div>
      <div className="mt-2">
        <label htmlFor="title">Category name:</label>
        <form className="flex gap-3 lg:items-end mb-2 flex-col lg:flex-row items-start">
          <input
            className="w-full rounded-lg dark:border-0 border-gray-200 border-2 p-3 text-sm h-12"
            placeholder="Name"
            type="text"
            id="name"
            value={name || ""}
            onChange={(e: any) => {
              setName(e.target.value);
            }}
          />
          <input
            className="w-full rounded-lg dark:border-0 border-gray-200 border-2 p-3 text-sm h-12"
            placeholder="Email"
            type="email"
            id="email"
            value={email || ""}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
        </form>

        <button
          onClick={async () => {
            setLoading(true);
            await createAdminAction(name, email, "");

            setName("");
            setEmail("");
            setLoading(false);
          }}
          disabled={!name || !email || loading}
          className={`${
            (!name || !email || loading) && "cursor-not-allowed"
          } rounded-lg bg-blue-700 tracking-widest w-40 py-3 font-medium text-white `}
        >
          {loading ? <RiseLoader color="white" size={7} /> : "Add"}
        </button>
      </div>
    </div>
  );
}

export default Categories;
