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
import { useTranslation } from "react-i18next";

interface DeleteDeviceModalProps extends DisclosureProps {
  device: DeviceDocType;
}

export default function DeleteDeviceModal({
  device,
  isOpen,
  onClose,
  onOpenChange,
}: DeleteDeviceModalProps) {
  const { t } = useTranslation();
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
              {t("deleteDevice")}
            </ModalHeader>
            <ModalBody>
              <div className="flex">{t("deleteConfirmation")}</div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="bordered"
                className="border border-divider"
                onPress={onClose}
              >
                {t("cancel")}
              </Button>
              <Button
                color="danger"
                startContent={
                  <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                }
                isLoading={isPending}
                onPress={() => mutate()}
              >
                {t("delete")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
