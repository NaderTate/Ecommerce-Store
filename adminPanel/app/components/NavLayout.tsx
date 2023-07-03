import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Nav from "./Nav";
async function NavLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/dashboard");
  return (
    <div className="">
      <Nav
        name={session?.user?.name || ""}
        email={session?.user?.email || ""}
        image={session?.user?.image || ""}
      />
      <div>{children}</div>
    </div>
  );
}

export default NavLayout;
