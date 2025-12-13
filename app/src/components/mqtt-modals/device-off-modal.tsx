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
import { useTranslation } from "react-i18next";

export default function DeviceOffModal({
  isOpen,
  onOpenChange,
}: DisclosureProps) {
  const { t } = useTranslation();

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
              {t("powerStatus")}
            </ModalHeader>
            <ModalBody className="items-center justify-center">
              <div className="flex">{t("deviceOff")}</div>
              <FontAwesomeIcon
                icon={faToggleOff}
                className="text-[60pt] text-danger"
              ></FontAwesomeIcon>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                {t("close")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
