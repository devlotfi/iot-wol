import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
  Switch,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";
import type { DisclosureProps } from "../../types/disclosure-props";
import { ValidatedInput } from "../validated-input";
import { useContext, useState } from "react";
import { RxDBContext } from "../../context/rxdb-context";
import { v4 as uuid } from "uuid";
import type { ConnectionDocType } from "../../rxdb/connection";
import { useTranslation } from "react-i18next";

export default function AddConnectionModal({
  isOpen,
  onClose,
  onOpenChange,
}: DisclosureProps) {
  const { t } = useTranslation();
  const { rxdb } = useContext(RxDBContext);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (connection: Omit<ConnectionDocType, "id">) => {
      await rxdb.connections.insert({
        id: uuid(),
        name: connection.name,
        url: connection.url,
        topic: connection.topic,
        responseTopic: connection.responseTopic,
        username: connection.username || null,
      });
      queryClient.resetQueries({
        queryKey: ["CONNECTIONS"],
      });
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
      username: "",
      topic: "iot-wol/topic",
      responseTopic: "iot-wol/response-topic",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      url: yup
        .string()
        .matches(
          /^(wss?|WSS?):\/\/([a-zA-Z0-9.-]+|\[[0-9a-fA-F:]+\])(:\d{1,5})?(\/[^\s]*)?$/,
          {
            message: "Invalid url",
          }
        )
        .required(),
      username: yup.string(),
      topic: yup.string().required(),
      responseTopic: yup.string().required(),
    }),
    onSubmit(values) {
      mutate(values);
    },
  });

  const [useAuth, setUseAuth] = useState<boolean>(true);

  return (
    <Modal
      backdrop="blur"
      scrollBehavior="outside"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-[1rem]"
          >
            <ModalHeader className="flex flex-col gap-1">
              {t("addConnection")}
            </ModalHeader>
            <ModalBody>
              <ValidatedInput
                isRequired
                formik={formik}
                name="name"
                label={t("name")}
                classNames={{
                  inputWrapper: "shadow-none border border-divider",
                }}
              ></ValidatedInput>
              <ValidatedInput
                isRequired
                formik={formik}
                name="url"
                label="URL"
                classNames={{
                  inputWrapper: "shadow-none border border-divider",
                }}
              ></ValidatedInput>
              <ValidatedInput
                isRequired
                formik={formik}
                name="topic"
                label="Topic"
                classNames={{
                  inputWrapper: "shadow-none border border-divider",
                }}
              ></ValidatedInput>
              <ValidatedInput
                isRequired
                formik={formik}
                name="responseTopic"
                label="Response Topic"
                classNames={{
                  inputWrapper: "shadow-none border border-divider",
                }}
              ></ValidatedInput>
              <Switch
                isSelected={useAuth}
                onValueChange={(value) => {
                  formik.setFieldValue("username", "");
                  setUseAuth(value);
                }}
              >
                {t("useAuthenthication")}
              </Switch>
              {useAuth ? (
                <ValidatedInput
                  isRequired
                  formik={formik}
                  name="username"
                  label={t("username")}
                  classNames={{
                    inputWrapper: "shadow-none border border-divider",
                  }}
                ></ValidatedInput>
              ) : null}
            </ModalBody>
            <ModalFooter>
              <Button
                fullWidth
                type="submit"
                color="primary"
                isLoading={isPending}
                startContent={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
              >
                {t("add")}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
