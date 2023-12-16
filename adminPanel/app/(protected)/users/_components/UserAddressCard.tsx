import React from "react";

type Props = {
  address: {
    Street: string;
    Building: string;
    City: string;
    Landmark: string;
    Country: string;
    PostalCode: string;
  };
};

const UserAddressCard = ({ address }: Props) => {
  return (
    <div className="border border-divider p-5 rounded-md max-w-xs space-y-5">
      <div className="flex justify-between">
        <h1>Country:</h1>
        <h1>{address.Country}</h1>
      </div>
      <div className="flex justify-between">
        <h1>City:</h1>
        <h1>{address.City}</h1>
      </div>
      <div className="flex justify-between">
        <h1>Street:</h1>
        <h1>{address.Street}</h1>
      </div>
      <div className="flex justify-between">
        <h1>Building:</h1>
        <h1>{address.Building}</h1>
      </div>
      <div className="flex justify-between">
        <h1>Postal code:</h1>
        <h1>{address.PostalCode}</h1>
      </div>
      <div className="flex justify-between">
        <h1>Lanmark:</h1>
        <h1>{address.Landmark}</h1>
      </div>
    </div>
  );
};

export default UserAddressCard;
