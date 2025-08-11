import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
} from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";
import { DeviceStore } from "../device-store";
import type { Device } from "../types/device";

interface DeleteDeviceModalProps {
  device: Device;
}

export default function DeleteDeviceModal({ device }: DeleteDeviceModalProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  return (
    <>
      <Button variant="bordered" isIconOnly size="sm" onPress={onOpen}>
        <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete device
              </ModalHeader>
              <ModalBody>
                <div className="flex">
                  Are you sure you want to delete this device ?
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  startContent={
                    <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                  }
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  startContent={
                    <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                  }
                  onPress={() => {
                    DeviceStore.deleteDevice(device.id);
                    queryClient.resetQueries({
                      queryKey: ["DEVICES"],
                    });
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
