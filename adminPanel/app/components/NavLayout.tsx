import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Nav from "./Nav";
async function NavLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/dashboard");
  return (
    <div className="min-h-screen">
      <Nav
        name={session?.user?.name || ""}
        email={session?.user?.email || ""}
        image={session?.user?.image || ""}
      />
      <div className="sm:ml-[200px]  p-4 pb-0 ">{children}</div>
    </div>
  );
}

export default NavLayout;
