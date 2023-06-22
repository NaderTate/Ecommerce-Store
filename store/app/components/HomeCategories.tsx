import Link from "next/link";
import React from "react";
function HomeCategories({ categories }: { categories: any }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mx-5 lg:mr-10 justify-center">
        {categories &&
          categories.map(
            ({
              label,
              Image,
              id,
            }: {
              label: string;
              Image: string;
              id: string;
            }) => {
              return (
                <div
                  key={id}
                  className="bg-white dark:bg-black/30 p-2 rounded-md"
                >
                  <Link href={{ pathname: `/categories/${label}` }}>
                    <h1>{label}</h1>
                    <img src={Image} alt="" />
                  </Link>
                  <button className="text-xs">Shop now</button>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
}

export default HomeCategories;
