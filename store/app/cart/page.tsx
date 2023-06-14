import React from "react";
import { currentUser } from "@clerk/nextjs";

async function page() {
  const user = await currentUser();
  // console.log(user);
  return <div>page</div>;
}

export default page;
