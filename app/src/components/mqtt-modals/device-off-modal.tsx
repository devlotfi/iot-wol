import { faToggleOff } from "@fortawesome/free-solid-svg-icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import type { DisclosureProps } from "../../types/disclosure-props";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeviceOffModal({
  isOpen,
  onOpenChange,
}: DisclosureProps) {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Power status
            </ModalHeader>
            <ModalBody className="items-center justify-center">
              <div className="flex">The device is turned OFF</div>
              <FontAwesomeIcon
                icon={faToggleOff}
                className="text-[60pt] text-danger"
              ></FontAwesomeIcon>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
