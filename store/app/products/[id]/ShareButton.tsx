"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import ShareIcons from "./ShareIcons";
import { IoMdShareAlt } from "react-icons/io";

type Props = {
  productTitle: string;
  productImage: string;
};

const ShareButton = ({ productTitle, productImage }: Props) => {
  return (
    <Accordion>
      <AccordionItem
        hideIndicator
        startContent={<IoMdShareAlt size={25} />}
        key="1"
        aria-label="Share"
      >
        <ShareIcons productTitle={productTitle} productImage={productImage} />
      </AccordionItem>
    </Accordion>
  );
};

export default ShareButton;
