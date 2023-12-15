"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { deleteCategory } from "@/app/server_actions/categories";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
type Props = {
  categoryId: string;
};
export default function ConfirmDelete({ categoryId }: Props) {
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} defaultOpen>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">Are you sure about that?</h1>
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
                      await deleteCategory(categoryId);
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
