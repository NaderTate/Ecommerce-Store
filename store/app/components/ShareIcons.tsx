"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";
function ShareIcons({ title, mainImg }: { title: string; mainImg: string }) {
  const pathname = "https://naderexpress.vercel.app" + usePathname();

  return (
    <div>
      <div className="mt-5">
        <div className="flex flex-wrap gap-2">
          <FacebookShareButton url={pathname}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <WhatsappShareButton url={pathname} title={title} separator=":: ">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <TwitterShareButton url={pathname} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <TelegramShareButton url={pathname} title={title}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <RedditShareButton url={pathname} title={title}>
            <RedditIcon size={32} round />
          </RedditShareButton>
          <LinkedinShareButton url={pathname}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <PinterestShareButton url={pathname} media={mainImg}>
            <PinterestIcon size={32} round />
          </PinterestShareButton>

          <EmailShareButton url={pathname} subject={title} body="body">
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
}

export default ShareIcons;
