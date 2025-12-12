import { faClock } from "@fortawesome/free-solid-svg-icons";
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

export default function TimeoutModal({
  isOpen,
  onOpenChange,
}: DisclosureProps) {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              No response
            </ModalHeader>
            <ModalBody className="items-center justify-center">
              <div className="flex text-center">
                The request has timed out and no response was recieved
              </div>
              <FontAwesomeIcon
                icon={faClock}
                className="text-[60pt] text-warning"
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
