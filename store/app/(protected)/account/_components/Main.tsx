"use client";

import { useState } from "react";

import { Address, Card } from "@prisma/client";

import { Tabs, Tab } from "@nextui-org/react";

import Addresses from "./Addresses";
import PaymentCards from "./PaymentCards";
import UserDetailsForm from "./UserDetailsForm";

import { CiCreditCard1 } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";

type Props = { userId: string; addresses: Address[]; cards: Card[] };

const Main = ({ userId, addresses, cards }: Props) => {
  const [content, setContent] = useState<string>("details");

  return (
    <Tabs
      className="flex justify-center"
      aria-label="Options"
      selectedKey={content}
      onSelectionChange={(key) => setContent(String(key))}
    >
      <Tab
        key="details"
        title={
          <div className="flex items-center">
            <FaRegUserCircle size={20} />
            <span className="ml-2">Details</span>
          </div>
        }
      >
        <UserDetailsForm userId={userId} />
      </Tab>
      <Tab
        key="addresses"
        title={
          <div className="flex items-center">
            <FaLocationDot size={20} />
            <span className="ml-2">Addresses</span>
          </div>
        }
      >
        <Addresses addresses={addresses} userId={userId} />
      </Tab>
      <Tab
        key="cards"
        title={
          <div className="flex items-center">
            <CiCreditCard1 size={20} />
            <span className="ml-2">Cards</span>
          </div>
        }
      >
        <PaymentCards userId={userId} cards={cards} />
      </Tab>
    </Tabs>
  );
};

export default Main;
