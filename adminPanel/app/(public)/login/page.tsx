"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import LoginButton from "./_components/LoginButton";

function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const { data: session } = useSession();
  if (session) redirect(callbackUrl);
  return (
    <div className="bg-white min-h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            alt="Pattern"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className=" inset-0 h-full w-full object-cover"
          />
        </aside>

        <div className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <Image width={100} height={100} sizes="" src="/logo.svg" alt="" />
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Nader Express 🛒
            </h1>
            <p className="mt-4 leading-relaxed text-gray-500">
              Please use your google account to access the admin dashboard
            </p>
            <LoginButton callbackUrl={callbackUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
