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

interface DeleteConnectionModalProps extends DisclosureProps {
  connection: ConnectionDocType;
}

export default function DeleteConnectionModal({
  connection,
  isOpen,
  onClose,
  onOpenChange,
}: DeleteConnectionModalProps) {
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
              Delete connection
            </ModalHeader>
            <ModalBody>
              <div className="flex">
                Are you sure you want to delete this connection ?
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
