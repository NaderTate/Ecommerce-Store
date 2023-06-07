"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
const SignInButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  return (
    <button
      onClick={() => signIn("google", { callbackUrl })}
      className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
      href="/download"
    >
      <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

      <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
        Sign in with Google
      </span>
    </button>
  );
};
function page() {
  return (
    <div className="bg-white min-h-screen">
      <section className="">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Pattern"
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main
            aria-label="Main"
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <a className="block text-blue-600" href="/">
                <span className="sr-only">Home</span>
                <img
                  src="https://res.cloudinary.com/dqkyatgoy/image/upload/v1685277800/Nader%20Express/logo_wjbyiz.svg"
                  alt=""
                />
              </a>

              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Nader Express 🛒
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Please use your google account to access the admin dashboard
              </p>
              <SignInButton />
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}

export default page;
