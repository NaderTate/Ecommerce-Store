"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
type Props = {
  description: string;
};

const ProductDescription = ({ description }: Props) => {
  return (
    <Accordion
      defaultExpandedKeys={["1"]}
      className="sm:min-h-[300px] whitespace-pre-wrap"
    >
      <AccordionItem key="1" aria-label="Description" title="Description">
        {description}
      </AccordionItem>
    </Accordion>
  );
};

export default ProductDescription;
