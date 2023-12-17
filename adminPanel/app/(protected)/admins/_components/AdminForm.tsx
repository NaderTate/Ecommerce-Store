"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

import { FaRegEdit } from "react-icons/fa";

import { useHandleAdminData } from "../_hooks/useHandleAdminData";

type Props = {
  admin?: {
    id: string;
    Name: string;
    Email: string;
  };
};
const AdminForm = ({ admin }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { adminData, setAdminData, isSubmitting, onSubmit } =
    useHandleAdminData({ ...admin });

  return (
    <>
      <Button
        className={admin ? "" : "w-36"}
        color={admin ? "default" : "primary"}
        variant={admin ? "light" : "solid"}
        size={admin ? "sm" : "lg"}
        onPress={onOpen}
        isIconOnly={admin ? false : true}
      >
        {admin ? <FaRegEdit size={16} /> : "New"}
      </Button>
      <Modal placeholder="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">
                  {admin ? "Edit" : "New"} Admin
                </h1>
              </ModalHeader>
              <ModalBody>
                <Input
                  variant="bordered"
                  label="name"
                  defaultValue={adminData.Name}
                  onValueChange={(e) => {
                    setAdminData({ ...adminData, Name: e });
                  }}
                />
                <Input
                  variant="bordered"
                  label="Admin email"
                  defaultValue={adminData.Email}
                  onValueChange={(e) => {
                    setAdminData({ ...adminData, Email: e });
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  isLoading={isSubmitting}
                  isDisabled={
                    isSubmitting || !adminData.Name || !adminData.Email
                  }
                  color="primary"
                  onPress={async () => {
                    await onSubmit();
                    onClose();
                  }}
                >
                  {admin ? "Edit" : "Add"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminForm;
