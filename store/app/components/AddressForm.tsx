"use client";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";
import { updateAddressAction } from "../_actions";
function UserDetailsForm({
  userId,
  address,
}: {
  userId: string;
  address: any;
}) {
  const notify = () => toast("Your address has been updated");
  const formRef = useRef<HTMLFormElement>(null);
  async function action(data: FormData) {
    const Country = String(data.get("country"));
    const City = String(data.get("city"));
    const Street = String(data.get("street"));
    const Building = String(data.get("building"));
    const PostalCode = Number(data.get("postalCode"));
    const Landmark = String(data.get("landmark"));
    await updateAddressAction(userId, {
      Country,
      City,
      Street,
      Building,
      PostalCode,
      Landmark,
    });
    notify();
  }
  const inputStyle = "h-10 my-2 rounded-md px-2";
  return (
    <div>
      <ToastContainer autoClose={3000} />

      <div className="flex gap-5 items-end mb-2"></div>
      <form ref={formRef} action={action}>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5 w-full">
          <div className="flex flex-col">
            <label htmlFor="country">Country/Region</label>
            <select
              name="country"
              id="country"
              className={inputStyle}
              defaultValue={address?.Country}
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
              defaultValue={address?.City}
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
            defaultValue={address?.Street}
            className={inputStyle}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5">
          <div className="flex flex-col">
            <label htmlFor="building">Building name/no</label>
            <input
              type="text"
              name="building"
              defaultValue={address?.Building}
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
              defaultValue={address?.PostalCode}
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
            defaultValue={address?.Landmark}
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
