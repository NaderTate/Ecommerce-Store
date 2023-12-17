"use client";

import { Card } from "@prisma/client";

import { ToastContainer } from "react-toastify";
import { Button, Input } from "@nextui-org/react";

import { useHandlePaymentCards } from "../_hooks/useHandlePaymentCards";

import { LiaCcDiscover } from "react-icons/lia";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

type Props = { userId: string; card?: Card };

const PaymentCardForm = ({ userId, card }: Props) => {
  const { cardDetails, setCardDetails, loading, onSubmit } =
    useHandlePaymentCards(userId, card);

  return (
    <>
      <ToastContainer autoClose={1500} />
      <form className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          <Input
            startContent={
              cardDetails.CardType === "Visa" ? (
                <FaCcVisa size={20} />
              ) : cardDetails.CardType === "Mastercard" ? (
                <FaCcMastercard size={20} />
              ) : cardDetails.CardType === "AmericanExpress" ? (
                <SiAmericanexpress size={20} />
              ) : cardDetails.CardType === "Discover" ? (
                <LiaCcDiscover size={20} />
              ) : null
            }
            onValueChange={setCardDetails.setCardNumber}
            label="card number"
            variant="bordered"
            required
            value={cardDetails.CardNumber}
          />
          <Input
            onValueChange={setCardDetails.setHolderName}
            label="card holder name"
            required
            variant="bordered"
            value={cardDetails.HolderName}
          />
          <Input
            onValueChange={setCardDetails.setCVV}
            type="number"
            label="CVV"
            variant="bordered"
            value={cardDetails.CVV}
          />

          <Input
            onValueChange={setCardDetails.setExpiry}
            type="date"
            variant="bordered"
            label="Expiration date"
            value={cardDetails.Expiry}
          />
        </div>
        <Button
          isDisabled={loading}
          isLoading={loading}
          onPress={onSubmit}
          color="primary"
        >
          Save
        </Button>
      </form>
    </>
  );
};

export default PaymentCardForm;
