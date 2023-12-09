"use client";
import { User } from "@prisma/client";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import React, { useState } from "react";
import { useRef } from "react";
import { updateUserInfoAction } from "../_actions";
import axios from "axios";
function UserDetailsForm({ userData }: { userData: User }) {
  const notify = () => toast("Your data has been updated");
  const formRef = useRef<HTMLFormElement>(null);
  const [image, setImage] = useState(userData.Image);
  const [uploading, setUploading] = useState(false);
  async function action(data: FormData) {
    const name = String(data.get("name"));
    const email = String(data.get("email"));
    const phone = Number(data.get("phone"));
    const gender = String(data.get("gender"));
    const birthDate = String(data.get("birthDate"));
    if (name == "" || email == "") return;
    await updateUserInfoAction(
      userData.UserId,
      name,
      email,
      phone,
      gender,
      birthDate,
      image
    );
    notify();
  }
  const inputStyle = "h-10 my-2 rounded-md px-2";
  return (
    <div>
      <ToastContainer autoClose={3000} />

      <form ref={formRef} action={action}>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5 w-full">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              defaultValue={userData.Name || ""}
              className={inputStyle}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              defaultValue={userData.Email}
              className={inputStyle}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-5">
          <div className="flex flex-col">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="number"
              name="phone"
              defaultValue={userData.Phone != 0 ? userData.Phone : ""}
              placeholder="Mobile number"
              className={inputStyle}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              defaultValue={
                userData.Gender !== "" ? userData.Gender : "noGender"
              }
              className={inputStyle}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="noGender">Prefer not to say</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="birthDate">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              className={inputStyle}
              defaultValue={userData.BirthDate}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-36 h-12 rounded-md bg-blue-700 mt-2 text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default UserDetailsForm;
