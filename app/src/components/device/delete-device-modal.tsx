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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DeviceDocType } from "../../rxdb/device";
import type { DisclosureProps } from "../../types/disclosure-props";
import { useContext } from "react";
import { RxDBContext } from "../../context/rxdb-context";

interface DeleteDeviceModalProps extends DisclosureProps {
  device: DeviceDocType;
}

export default function DeleteDeviceModal({
  device,
  isOpen,
  onClose,
  onOpenChange,
}: DeleteDeviceModalProps) {
  const { rxdb } = useContext(RxDBContext);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const doc = await rxdb.devices.findOne(device.id).exec();
      if (!doc) return;
      await doc.remove();
      queryClient.resetQueries({
        queryKey: ["DEVICES"],
      });
      onClose();
    },
  });

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
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
                variant="bordered"
                className="border border-divider"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                startContent={
                  <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                }
                isLoading={isPending}
                onPress={() => mutate()}
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
