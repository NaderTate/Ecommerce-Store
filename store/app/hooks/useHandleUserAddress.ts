"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { createNewAddress, updateUserAddress } from "../server_actions/users";
import { Address } from "@prisma/client";
export const useHandleUserAddress = (UserId: string, address?: Address) => {
  const [Country, setCountry] = useState(address?.Country || "");
  const [City, setCity] = useState(address?.City || "");
  const [Street, setStreet] = useState(address?.Street || "");
  const [Building, setBuilding] = useState(address?.Building || "");
  const [PostalCode, setPostalCode] = useState(address?.PostalCode || "");
  const [Landmark, setLandmark] = useState(address?.Landmark || "");
  const [loading, setLoading] = useState(false);
  const notify = (message: string) => toast(message);
  const onSubmit = async function () {
    setLoading(true);
    if (address) {
      await updateUserAddress(address.id, {
        Country,
        City,
        Street,
        Building,
        PostalCode,
        Landmark,
      });
      setLoading(false);
      notify("Your address has been updated");
    } else {
      await createNewAddress(UserId, {
        Country,
        City,
        Street,
        Building,
        PostalCode,
        Landmark,
      });
      setLoading(false);
      notify("Your address has been added");
    }
  };
  return {
    loading,
    addressDetails: {
      Country,
      City,
      Street,
      Building,
      PostalCode,
      Landmark,
    },
    setAddressDetails: {
      setCountry,
      setCity,
      setStreet,
      setBuilding,
      setPostalCode,
      setLandmark,
    },
    onSubmit,
  };
};
