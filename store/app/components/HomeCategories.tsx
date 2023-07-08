import Link from "next/link";
import React from "react";
import Image from "next/image";
function HomeCategories({ categories }: { categories: any }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mx-5 lg:mr-10 justify-center">
        {categories &&
          categories.map(
            ({
              label,
              Image: img,
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
                  <Link href={{ pathname: `/categories/${id}` }}>
                    <h1>{label}</h1>
                    <Image
                      width={400}
                      height={400}
                      className="object-cover"
                      src={img}
                      alt=""
                    />
                    <button className="text-xs">Shop now</button>
                  </Link>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
}

export default HomeCategories;
