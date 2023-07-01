import React from "react";
import { SignIn } from "@clerk/nextjs/app-beta";
async function page({ searchParams }: { searchParams: any }) {
  const { redirectURL } = searchParams;
  return (
    <div>
      <div className="flex justify-center">
        <SignIn redirectUrl={redirectURL || "/"} signUpUrl="/sign-up" />
      </div>
    </div>
  );
}

export default page;
