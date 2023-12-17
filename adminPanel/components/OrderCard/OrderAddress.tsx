type Props = {
  address: {
    Street: string;
    Building: string;
    City: string;
    Landmark: string;
    Country: string;
  };
};

const OrderAddress = ({ address }: Props) => {
  return (
    <div className="border rounded-md p-5 space-y-2 md:text-lg mt-2 bg-gray-100 dark:bg-inherit">
      <span className="font-bold">Shipped to:</span>
      <div className="flex gap-10 justify-between">
        <span>Street: </span>
        <span>{address.Street}</span>
      </div>
      <div className="flex gap-10 justify-between">
        <span>Building:</span>
        <span> {address.Building}</span>
      </div>
      <div className="flex gap-10 justify-between">
        <span>City:</span> <span>{address.City}</span>
      </div>
      <div className="flex gap-10 justify-between">
        <span>Landmark:</span> <span>{address.Landmark}</span>
      </div>
      <div className="flex gap-10 justify-between">
        <span>Country:</span> <span>{address.Country}</span>
      </div>
    </div>
  );
};

export default OrderAddress;
