"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import CategoryForm from "./CategoryForm";

const CategoryPopup = ({ category, allCategories }: CategoryFormProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="w-36" color="primary" onPress={onOpen}>
        {category ? "Edit" : "New"}
      </Button>
      <Modal
        placement="center"
        size="5xl"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">
                  {category ? "Edit" : "New"} Category
                </h1>
              </ModalHeader>
              <ModalBody>
                <CategoryForm
                  category={category}
                  allCategories={allCategories}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoryPopup;
