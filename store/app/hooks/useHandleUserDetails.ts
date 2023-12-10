"use client";
import { useState, useEffect } from "react";
import { getUserDetails, updateUserDetails } from "../server_actions/users";
import { toast } from "react-toastify";
export const useHandleUserDetails = (UserId: string) => {
  const [loading, setLoading] = useState(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Gender, setGender] = useState("");
  const [BirthDate, setBirthDate] = useState("");

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
    const notify = () => toast("Your data has been updated");
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
