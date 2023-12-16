"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteUser } from "../../../server_actions/users";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
function BanButton({ id }: { id: string }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleting, setDeleting] = useState(false);

  return (
    <>
      <Button color="danger" onPress={onOpen}>
        BAN
      </Button>
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">Are you sure about that?</h1>
                <h3 className="font-thin">
                  This will delete the user from the database, this action is
                  irreversible.
                </h3>
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-10">
                  <Button color="default" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    isDisabled={deleting}
                    isLoading={deleting}
                    color="danger"
                    onPress={async () => {
                      setDeleting(true);
                      await deleteUser(id);
                      setDeleting(false);
                      router.push("/users");
                      onClose();
                    }}
                  >
                    BAN
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default BanButton;
