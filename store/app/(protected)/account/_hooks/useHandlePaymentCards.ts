"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import { Card } from "@prisma/client";

import { createNewCard, updateCard } from "@/actions/paymentCards";

export const useHandlePaymentCards = (UserId: string, card?: Card) => {
  const [CardNumber, setCardNumber] = useState(card?.CardNumber || "");
  const [HolderName, setHolderName] = useState(card?.HolderName || "");
  const [Expiry, setExpiry] = useState(card?.Expiry || "");
  const [CVV, setCVV] = useState(card?.CVV || "");
  const [loading, setLoading] = useState(false);
  const notify = (message: string) => toast(message);

  const getCardType = (cardNumber: string) => {
    var visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    var mastercardRegex = /^5[1-5][0-9]{14}$/;
    var amexRegex = /^3[47][0-9]{13}$/;
    var discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

    if (visaRegex.test(cardNumber)) {
      return "Visa";
    } else if (mastercardRegex.test(cardNumber)) {
      return "MasterCard";
    } else if (amexRegex.test(cardNumber)) {
      return "American Express";
    } else if (discoverRegex.test(cardNumber)) {
      return "Discover";
    } else {
      return "Unknown";
    }
  };

  const CardType = getCardType(CardNumber);

  const onSubmit = async function () {
    setLoading(true);

    if (card) {
      await updateCard(card.id, {
        CardNumber,
        HolderName,
        Expiry,
        CVV,
        CardType,
      });
      notify("Your card has been updated");
    } else {
      await createNewCard(UserId, {
        CardNumber,
        HolderName,
        Expiry,
        CVV,
        CardType,
      });
      setCardNumber("");
      setHolderName("");
      setExpiry("");
      setCVV("");
      notify("Your card has been added");
    }

    setLoading(false);
  };

  return {
    loading,
    cardDetails: {
      CardNumber,
      HolderName,
      Expiry,
      CVV,
      CardType,
    },
    setCardDetails: {
      setCardNumber,
      setHolderName,
      setExpiry,
      setCVV,
    },
    onSubmit,
  };
};
