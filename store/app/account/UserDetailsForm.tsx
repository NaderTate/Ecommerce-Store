"use client";
import { ToastContainer } from "react-toastify";
import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useHandleUserDetails } from "../hooks/useHandleUserDetails";
type Props = { userId: string };

function UserDetailsForm({ userId }: Props) {
  const { userDetails, setUserDetails, loading, onSubmit } =
    useHandleUserDetails(userId);
  return (
    <>
      <ToastContainer autoClose={1500} />
      <form className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          <Input
            onValueChange={setUserDetails.setName}
            label="name"
            variant="bordered"
            required
            value={userDetails.Name}
          />
          <Input
            onValueChange={setUserDetails.setEmail}
            type="email"
            label="Email address"
            required
            variant="bordered"
            value={userDetails.Email}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-5">
          <Input
            onValueChange={setUserDetails.setPhone}
            type="number"
            label="phone"
            variant="bordered"
            value={userDetails.Phone}
          />
          <Select
            onChange={(e) => setUserDetails.setGender(e.target.value)}
            variant="bordered"
            label="Gender"
            selectedKeys={[userDetails.Gender || "noGender"]}
          >
            <SelectItem key={"male"} value={"male"}>
              Male
            </SelectItem>
            <SelectItem key={"female"} value={"female"}>
              Femlate
            </SelectItem>
            <SelectItem key={"noGender"} value={"noGender"}>
              Prefer not to say
            </SelectItem>
          </Select>

          <Input
            onValueChange={setUserDetails.setBirthDate}
            type="date"
            variant="bordered"
            label="birthDate"
            value={userDetails.BirthDate}
          />
        </div>
        <Button
          isDisabled={loading}
          isLoading={loading}
          onPress={onSubmit}
          color="primary"
        >
          Save
        </Button>
      </form>
    </>
  );
}

export default UserDetailsForm;
