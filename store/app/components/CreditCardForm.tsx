import React from "react";

function CreditCardForm() {
  const inputStyle = "h-10 my-2 rounded-md px-2";

  return (
    <div>
      <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5 w-full">
          <div className="flex flex-col">
            <label htmlFor="name">Card number</label>
            <input
              type="number"
              name="name"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className={inputStyle}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Card holder&apos;s name</label>
            <input
              type="text"
              name="holderName"
              id="holderName"
              placeholder="Holder's name"
              className={inputStyle}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5">
          <div className="flex flex-col">
            <label htmlFor="cvv">CVV</label>
            <input
              type="number"
              name="cvv"
              placeholder="123"
              className={inputStyle}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="birthDate">Expiry Date</label>
            <input type="month" name="birthDate" className={inputStyle} />
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

export default CreditCardForm;
