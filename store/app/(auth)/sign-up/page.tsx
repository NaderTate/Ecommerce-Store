import React from "react";
import { SignUp } from "@clerk/nextjs/app-beta";
export const metadata = {
  metadataBase: new URL("https://naderexpress.vercel.app/"),
  title: "Sign up",
  description: "sign up to nader express",
  openGraph: {
    title: "Sign up",
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
    title: "Sign up",
    description: "sign ",
  },
};

type Props = {
  searchParams: { redirectUrl: string };
};

async function page({ searchParams }: Props) {
  const { redirectUrl } = searchParams;
  return (
    <div className="flex justify-center">
      <SignUp redirectUrl={redirectUrl || "/"} />
    </div>
  );
}
// .
export default page;
