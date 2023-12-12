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
function ShareIcons({
  productTitle,
  productImage,
}: {
  productTitle: string;
  productImage: string;
}) {
  const pathname = "https://naderexpress.vercel.app" + usePathname();

  return (
    <div className="mt-5">
      <div className="flex flex-wrap gap-2">
        <FacebookShareButton url={pathname}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <WhatsappShareButton
          url={pathname}
          title={productTitle}
          separator=":: "
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <TwitterShareButton url={pathname} title={productTitle}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <TelegramShareButton url={pathname} title={productTitle}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <RedditShareButton url={pathname} title={productTitle}>
          <RedditIcon size={32} round />
        </RedditShareButton>
        <LinkedinShareButton url={pathname}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <PinterestShareButton url={pathname} media={productImage}>
          <PinterestIcon size={32} round />
        </PinterestShareButton>

        <EmailShareButton url={pathname} subject={productTitle} body="body">
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </div>
  );
}

export default ShareIcons;
