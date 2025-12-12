import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
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

export default function WOLSentModal({
  isOpen,
  onOpenChange,
}: DisclosureProps) {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Success</ModalHeader>
            <ModalBody className="items-center justify-center">
              <div className="flex">
                The WOL (Wake-On-Lan) packet has been sent
              </div>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-[60pt] text-success"
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
