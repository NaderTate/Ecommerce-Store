"use client";
import { ToastContainer } from "react-toastify";
import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Address } from "@prisma/client";
import { useHandleUserAddress } from "../hooks/useHandleUserAddress";
function AddressForm({
  userId,
  address,
}: {
  userId: string;
  address?: Address;
}) {
  const { addressDetails, setAddressDetails, loading, onSubmit } =
    useHandleUserAddress(userId, address);
  return (
    <>
      <ToastContainer autoClose={1500} />
      <form className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          <Select
            required
            variant="bordered"
            label="Country"
            onChange={(e) => setAddressDetails.setCountry(e.target.value)}
            selectedKeys={[addressDetails.Country]}
          >
            <SelectItem key="Egypt" value="Egypt">
              Egypt
            </SelectItem>
          </Select>
          <Input
            onValueChange={setAddressDetails.setCity}
            variant="bordered"
            label="City"
            value={addressDetails.City}
          />
        </div>
        <Input
          onValueChange={setAddressDetails.setStreet}
          variant="bordered"
          label="Street name"
          value={addressDetails.Street}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            onValueChange={setAddressDetails.setBuilding}
            variant="bordered"
            value={addressDetails.Building}
            label="Building name"
          />
          <Input
            required
            onValueChange={setAddressDetails.setPostalCode}
            variant="bordered"
            type="number"
            label="postal Code"
            value={addressDetails.PostalCode}
          />
        </div>
        <Input
          onValueChange={setAddressDetails.setLandmark}
          variant="bordered"
          label="Nearest landmark"
          value={addressDetails.Landmark}
        />
        <Button
          isLoading={loading}
          isDisabled={
            loading ||
            addressDetails.PostalCode == "" ||
            addressDetails.City == "" ||
            addressDetails.Country == ""
          }
          color="primary"
          onPress={onSubmit}
        >
          Save
        </Button>
      </form>
    </>
  );
}

export default AddressForm;
