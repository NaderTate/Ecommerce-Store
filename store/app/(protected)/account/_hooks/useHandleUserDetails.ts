"use client";

import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import { getUserDetails, updateUserDetails } from "@/actions/users";

export const useHandleUserDetails = (UserId: string) => {
  const [loading, setLoading] = useState(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Gender, setGender] = useState("");
  const [BirthDate, setBirthDate] = useState("");

  const notify = () => toast("Your data has been updated");

  const onSubmit = async function () {
    setLoading(true);

    await updateUserDetails(UserId, {
      Name,
      Email,
      Phone,
      Gender,
      BirthDate,
    });

    setLoading(false);
    notify();
  };

  useEffect(() => {
    const getDetails = async () => {
      const { user } = await getUserDetails(UserId);
      if (user) {
        setName(user.Name);
        setEmail(user.Email);
        setPhone(user.Phone);
        setGender(user.Gender);
        setBirthDate(user.BirthDate);
      }
    };
    getDetails();
  }, [UserId]);

  return {
    userDetails: {
      Name,
      Email,
      Phone,
      Gender,
      BirthDate,
    },
    setUserDetails: {
      setName,
      setEmail,
      setPhone,
      setGender,
      setBirthDate,
    },
    onSubmit,
    loading,
  };
};
