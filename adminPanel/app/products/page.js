"use client";
import Link from "next/link";
import NavLayout from "../components/NavLayout";
export default function Home() {
  return (
    <>
      <NavLayout>
        <Link
          className="inline-block rounded-lg bg-blue-700 tracking-widest px-5 py-3 font-medium text-white "
          href="/products/new"
        >
          New
        </Link>
      </NavLayout>
    </>
  );
}
