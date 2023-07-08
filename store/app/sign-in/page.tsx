import React from "react";
import { SignIn } from "@clerk/nextjs/app-beta";
export const metadata = {
  metadataBase: new URL("https://naderexpress.vercel.app/"),
  title: "Sign in",
  description: "sign in to nader express",
  openGraph: {
    title: "Sign in",
    type: "website",
    locale: "en_US",
    url: "https://naderexpress.vercel.app/",
    siteName: "Nader Express",
    images: [
      {
        url: "https://res.cloudinary.com/dqkyatgoy/image/upload/v1628753046/Nader%20Express/Frame_1_a507eb.svg",
        width: 800,
        height: 600,
        alt: "Nader Express",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@naderexpress",
    title: "Sign in",
    description: "sign ",
  },
};
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
