"use client";

import React from "react";

import { Card } from "@prisma/client";

import { Accordion, AccordionItem } from "@nextui-org/react";

import PaymentCardForm from "./PaymentCardForm";

import { IoIosAddCircleOutline } from "react-icons/io";

type Props = { userId: string; cards: Card[] };

const PaymentCards = ({ userId, cards }: Props) => {
  return (
    <>
      <h1 className="text-xl text-default-500">
        Your cards <span className="text-xs">({cards.length})</span>
      </h1>
      <Accordion isCompact>
        <AccordionItem
          startContent={<IoIosAddCircleOutline size={20} />}
          key={"1"}
          aria-label={"Add new card"}
          title={"Add new card"}
        >
          <PaymentCardForm userId={userId} />
        </AccordionItem>
      </Accordion>
      <Accordion isCompact>
        {cards.map((card) => {
          return (
            <AccordionItem
              key={card.id}
              aria-label={card.CardNumber}
              title={card.CardNumber}
            >
              <PaymentCardForm userId={userId} card={card} />
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default PaymentCards;
