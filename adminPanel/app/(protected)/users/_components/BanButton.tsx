"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteUser } from "../../../server_actions/users";
function BanButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await deleteUser(id);
        router.refresh();
      }}
      className="block text-white text-2xl rounded-md bg-[#FF0000] px-5 py-1 font-bold tracking-wider"
    >
      BAN
    </button>
  );
}

export default BanButton;
