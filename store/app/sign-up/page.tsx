import React from "react";
import { SignUp } from "@clerk/nextjs/app-beta";
async function page({ searchParams }: { searchParams: any }) {
  const { redirectUrl } = searchParams;
  return (
    <div>
      <div className="flex justify-center">
        <SignUp redirectUrl={redirectUrl || "/"} />
      </div>
    </div>
  );
}
// .
export default page;
