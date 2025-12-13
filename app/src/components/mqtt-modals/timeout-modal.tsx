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
import { useTranslation } from "react-i18next";

export default function TimeoutModal({
  isOpen,
  onOpenChange,
}: DisclosureProps) {
  const { t } = useTranslation();

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t("noResponse")}
            </ModalHeader>
            <ModalBody className="items-center justify-center">
              <div className="flex text-center">{t("timeoutMessage")}</div>
              <FontAwesomeIcon
                icon={faClock}
                className="text-[60pt] text-warning"
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
