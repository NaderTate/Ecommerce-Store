import React from "react";
import { SignIn } from "@clerk/nextjs/app-beta";
async function page({ searchParams }: { searchParams: any }) {
  const { redirectUrl } = searchParams;
  return (
    <div>
      <div className="flex justify-center">
        <SignIn redirectUrl={redirectUrl || "/"} />
      </div>
    </div>
  );
}

export default page;
