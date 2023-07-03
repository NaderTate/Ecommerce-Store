import React from "react";
import prisma from "@/lib/prisma";
import ReviewCard from "../components/ReviewCard";
import Link from "next/link";
import UserCard from "../components/UserCard";
async function page({ searchParams }: any) {
  const sk = searchParams.page || 1;
  const itemsToShow = 30;
  const count = await prisma.user.count();
  const pages = Array.from(
    { length: Math.ceil(count / itemsToShow) },
    (_, i) => i + 1
  );
  const pagenateArr = (arr: Array<number>, p: number) => {
    let newArr: Array<number> = [];
    arr.forEach((element: any) => {
      if (Math.abs(element - p) <= 2) {
        newArr = [...newArr, element];
      }
    });
    return newArr;
  };
  const Arr = pagenateArr(pages, sk);
  const users = await prisma.user.findMany({
    orderBy: { id: "desc" },
    select: {
      id: true,
      Name: true,
      Email: true,
      Image: true,
      Orders: { select: { id: true } },
    },
    take: itemsToShow,
    skip: (sk - 1) * itemsToShow,
  });
  return (
    <div className="flex flex-col min-h-screen">
      <p className="my-5">
        Displaying {(sk - 1) * itemsToShow}-
        {(count - (sk - 1) * itemsToShow) / itemsToShow > 1
          ? sk * itemsToShow
          : count}{" "}
        of {count} users
      </p>
      <div className="grid grid-flow-col auto-cols-[350px] gap-5 grow">
        {users.map(({ id, Name, Email, Image, Orders }) => {
          return (
            <UserCard
              key={id}
              id={id}
              Name={Name}
              Email={Email}
              Image={Image}
              OrdersCount={Orders.length}
            />
          );
        })}
      </div>

      {pages && Arr && (
        <ol className="flex justify-center gap-1 mt-16 text-sm font-medium">
          <li>
            <Link
              href={{
                pathname: "/reviews",
                query: { page: pages.at(0) },
              }}
              className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full hover:bg-slate-400/50 transition "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>
          {Arr &&
            Arr.map((page: any) => (
              <li key={page}>
                <Link
                  href={{
                    pathname: "/reviews",
                    query: { page: page },
                  }}
                  className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full hover:bg-slate-400/50 transition"
                >
                  {page}
                </Link>
              </li>
            ))}
          <li>
            <Link
              href={{
                pathname: "/reviews",
                query: { page: pages.at(-1) },
              }}
              className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full hover:bg-slate-400/50 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>
        </ol>
      )}
    </div>
  );
}

export default page;
