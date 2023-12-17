"use client";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { MdDeleteOutline } from "react-icons/md";

type Props = {
  id: string;
  deleteAction: Function;
};

export default function ConfirmDelete({ id, deleteAction }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleting, setDeleting] = useState(false);
  return (
    <>
      <Button
        variant="light"
        color="danger"
        size="sm"
        isIconOnly
        onPress={onOpen}
      >
        <MdDeleteOutline size={20} />
      </Button>
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-xl font-semibold">
                  Are you sure about that?
                </h1>
                <h3 className="font-thin text-sm">
                  This action is irreversible.
                </h3>
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-10">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    isDisabled={deleting}
                    isLoading={deleting}
                    color="primary"
                    onPress={async () => {
                      setDeleting(true);
                      await deleteAction(id);
                      setDeleting(false);
                      onClose();
                    }}
                  >
                    Delete
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
