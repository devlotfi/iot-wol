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
import { useTranslation } from "react-i18next";

export default function WOLSentModal({
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
              Wake-On-Lan
            </ModalHeader>
            <ModalBody className="items-center justify-center">
              <div className="flex">{t("wolSent")}</div>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-[60pt] text-success"
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
