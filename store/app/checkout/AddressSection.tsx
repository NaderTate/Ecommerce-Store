import { Radio, RadioGroup, Spacer } from "@nextui-org/react";
import Link from "next/link";
import AddressForm from "../account/AddressForm";

type Props = {
  addresses: { id: string; City: string; Street: string; Building: string }[];
  userId: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
};

const AddressSection = ({ addresses, userId, setAddress }: Props) => {
  return (
    <>
      <h1 className="text-xl font-bold tracking-wider ">Shipping address</h1>
      <Link className="text-sm underline" href={{ pathname: "/account" }}>
        Manage your addresses
      </Link>
      <Spacer y={4} />
      {addresses.length == 0 ? (
        <AddressForm userId={userId} />
      ) : (
        <RadioGroup defaultValue={addresses[0].id} onValueChange={setAddress}>
          {addresses.map((address) => (
            <Radio key={address.id} value={address.id}>
              <p>
                {address?.City}, {address?.Street}, {address?.Building}
              </p>
            </Radio>
          ))}
        </RadioGroup>
      )}
    </>
  );
};

export default AddressSection;
