"use client";
import { User } from "@prisma/client";
import React from "react";
import { useRef } from "react";
import { updateAddressAction } from "../_actions";
function UserDetailsForm({
  userId,
  address,
}: {
  userId: string;
  address: any;
}) {
  {
    /* @ts-ignore */
  }
  // const country = String(userData?.Address?.country)
  // const countray:string = String(userData?.Address["country"])
  const formRef = useRef<HTMLFormElement>(null);
  async function action(data: FormData) {
    const country = String(data.get("country"));
    const city = String(data.get("city"));
    const street = String(data.get("street"));
    const building = String(data.get("building"));
    const postalCode = String(data.get("postalCode"));
    const landmark = String(data.get("landmark"));
    // if (name == "" || email == "") return;
    await updateAddressAction(userId, {
      country,
      city,
      street,
      building,
      postalCode,
      landmark,
    });
  }
  const inputStyle = "h-10 my-2 rounded-md px-2";
  return (
    <div>
      <div className="flex gap-5 items-end mb-2"></div>
      <form ref={formRef} action={action}>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5 w-full">
          <div className="flex flex-col">
            <label htmlFor="country">Country/Region</label>
            <select
              name="country"
              id="country"
              className={inputStyle}
              defaultValue={address.country}
            >
              <option value="Egypt">Egypt</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="city">City/Area</label>
            <input
              type="text"
              name="city"
              id="city"
              defaultValue={address.city}
              className={inputStyle}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="street">Street name</label>
          <input
            type="text"
            name="street"
            placeholder="Street name"
            defaultValue={address.street}
            className={inputStyle}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5">
          <div className="flex flex-col">
            <label htmlFor="building">Building name/no</label>
            <input
              type="text"
              name="building"
              defaultValue={address.building}
              placeholder="Building name"
              className={inputStyle}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="number"
              name="postalCode"
              id="postalCode"
              className={inputStyle}
              defaultValue={address.postalCode}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="landmark">Nearest landmark</label>
          <input
            type="text"
            name="landmark"
            placeholder="Nearest landmark"
            // defaultValue={userData.Name}
            className={inputStyle}
            defaultValue={address.landmark}
          />
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
