"use client";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Nav from "./components/Nav";
export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login?callbackUrl=/");
    },
  });

  if (session) {
    return (
      <>
        <div className="grid grid-cols-6">
          <Nav
            name={session?.user?.name}
            email={session?.user?.email}
            image={session?.user?.image}
          />
          <div className="col-span-5"></div>
        </div>
      </>
    );
  }
}
