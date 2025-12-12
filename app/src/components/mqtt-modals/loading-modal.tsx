import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
} from "@heroui/react";
import type { DisclosureProps } from "../../types/disclosure-props";

export default function LoadingModal({
  isOpen,
  onOpenChange,
}: DisclosureProps) {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Loading...
            </ModalHeader>
            <ModalBody className="items-center justify-center pb-[3rem]">
              <Spinner size="lg" color="primary"></Spinner>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
