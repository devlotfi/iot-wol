import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
import type { DisclosureProps } from "../types/disclosure-props";

interface DeleteDeviceModalProps extends DisclosureProps {
  device: Device;
}

export default function DeleteDeviceModal({
  device,
  isOpen,
  onClose,
  onOpenChange,
}: DeleteDeviceModalProps) {
  const queryClient = useQueryClient();

  return (
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
              <Button color="default" onPress={onClose}>
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
  );
}
