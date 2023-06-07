import Link from "next/link";
import NavLayout from "../components/NavLayout";
import ProductCard from "../components/ProductCard";
import RiseLoader from "react-spinners/RiseLoader";
import { getProducts } from "@/lib/products";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Home({ searchParams }: any) {
  const sk = searchParams.page || 1;
  const search = searchParams.search ? searchParams.search : "";
  const { products } = await getProducts(sk, 20);
  const { count } = await getProducts(0, 0);
  const number = count || 1;
  const pages = Array.from({ length: Math.ceil(number / 20) }, (_, i) => i + 1);
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
  return (
    <>
      {/* @ts-ignore*/}
      <NavLayout>
        <Link
          className=" rounded-lg bg-blue-700 tracking-widest px-5 py-3 font-medium text-white "
          href={"/products/new"}
        >
          New
        </Link>
        <div className="flex flex-col min-h-[90vh]">
          <div className="grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 mt-4 gap-4 ">
              {products?.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
          </div>
          {pages && Arr && (
            <ol className="flex justify-center gap-1 mt-16 text-sm font-medium">
              <li>
                <a
                  href={`/products?page=${pages.at(0)}&search=${search}`}
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
                </a>
              </li>
              {Arr &&
                Arr.map((page: any) => (
                  <li key={page}>
                    <Link
                      href={`/products?page=${page}&search=${search}`}
                      className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full hover:bg-slate-400/50 transition"
                    >
                      {page}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  href={`/products?page=${pages.at(-1)}&search=${search}`}
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

          {!products && (
            <div className="absolute bottom-1 right-1">
              <RiseLoader color="#1D4ED8" size={7} />
            </div>
          )}
        </div>
      </NavLayout>
    </>
  );
}
