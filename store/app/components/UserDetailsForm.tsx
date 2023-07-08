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

      <div className="flex gap-5 items-end mb-2">
        <Image
          width={100}
          height={100}
          src={image}
          alt="User Image"
          className="rounded-md object-cover"
        />
        <label htmlFor="files" className="">
          <div
            className={`${
              uploading ? "cursor-not-allowed" : "cursor-pointer "
            } bg-gray-300 text-black relative rounded-md w-36 h-12 flex justify-center items-center`}
          >
            <div className="w-full ">
              {
                <div className="flex gap-1 justify-center items-center">
                  <p className="text-center ">
                    {image && !uploading && "Replace image"}
                    {image == "" && !uploading && "Upload image"}
                    {uploading && "Uploading..."}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`"w-6 h-6`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </div>
              }
              <input
                accept="image/*"
                disabled={uploading}
                className="hidden"
                id="files"
                type="file"
                title=" "
                onChange={async (event: any) => {
                  setUploading(true);
                  event.preventDefault();
                  const formData = new FormData();
                  formData.append("file", event.target.files[0]);
                  formData.append("upload_preset", "etttajb9");
                  await axios
                    .post(
                      "https://api.cloudinary.com/v1_1//dqkyatgoy/image/upload",
                      formData
                    )
                    .then((response) => {
                      setImage(response.data.secure_url);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                  setUploading(false);
                }}
              />
            </div>
          </div>
        </label>
      </div>
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
