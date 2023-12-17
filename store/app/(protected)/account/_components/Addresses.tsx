"use client";

import { Address } from "@prisma/client";

import { Accordion, AccordionItem } from "@nextui-org/react";

import AddressForm from "./AddressForm";

import { IoIosAddCircleOutline } from "react-icons/io";

type Props = { userId: string; addresses: Address[] };

const Addresses = ({ userId, addresses }: Props) => {
  return (
    <>
      <h1 className="text-xl text-default-500">
        Your addresses <span className="text-xs">({addresses.length})</span>
      </h1>

      <Accordion isCompact>
        <AccordionItem
          startContent={<IoIosAddCircleOutline size={20} />}
          key={"1"}
          aria-label={"Add new address"}
          title={"Add new address"}
        >
          <AddressForm userId={userId} />
        </AccordionItem>
      </Accordion>
      <Accordion isCompact>
        {addresses.map((address) => {
          return (
            <AccordionItem
              key={address.id}
              aria-label={`${address.Street} , ${address.Country}`}
              title={`${address.Street} , ${address.Country}`}
            >
              <AddressForm userId={userId} address={address} />
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default Addresses;
