import React from "react";

function PaypalForm() {
  return (
    <div>
      <form>
        <div className="flex flex-col">
          <label htmlFor="name">Paypal Email</label>
          <input
            type="email"
            name="name"
            placeholder="email"
            className="h-10 my-2 rounded-md px-2"
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

export default PaypalForm;
