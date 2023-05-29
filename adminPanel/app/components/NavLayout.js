import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import "nprogress/nprogress.css";
import Router from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Nav from "./Nav";
const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false }
);
function NavLayout({ children }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login?callbackUrl=/");
    },
  });
  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      NProgress.start();
    });
    Router.events.on("routeChangeComplete", (url) => {
      NProgress.done(false);
    });
  }, [Router]);
  if (session) {
    return (
      <>
        <TopProgressBar />
        <div className="grid grid-cols-6">
          <Nav
            name={session?.user?.name}
            email={session?.user?.email}
            image={session?.user?.image}
          />
          <div className="col-span-5 p-4">{children}</div>
        </div>
      </>
    );
  }
}

export default NavLayout;
