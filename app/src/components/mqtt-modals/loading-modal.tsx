import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
} from "@heroui/react";
import type { DisclosureProps } from "../../types/disclosure-props";
import { useTranslation } from "react-i18next";

export default function LoadingModal({
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
      isKeyboardDismissDisabled={true}
      hideCloseButton
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t("loading")}
            </ModalHeader>
            <ModalBody className="items-center justify-center pb-[3rem]">
              <Spinner size="lg" color="primary"></Spinner>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
