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
import type { DisclosureProps } from "../../types/disclosure-props";
import { useContext } from "react";
import { RxDBContext } from "../../context/rxdb-context";
import type { ConnectionDocType } from "../../rxdb/connection";
import { useTranslation } from "react-i18next";

interface DeleteConnectionModalProps extends DisclosureProps {
  connection: ConnectionDocType;
}

export default function DeleteConnectionModal({
  connection,
  isOpen,
  onClose,
  onOpenChange,
}: DeleteConnectionModalProps) {
  const { t } = useTranslation();
  const { rxdb } = useContext(RxDBContext);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const doc = await rxdb.connections.findOne(connection.id).exec();
      if (!doc) return;
      await doc.remove();
      queryClient.resetQueries({
        queryKey: ["CONNECTIONS"],
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
              {t("deleteConnection")}
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
