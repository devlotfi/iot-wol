import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
import { useFormik } from "formik";
import * as yup from "yup";
import type { DisclosureProps } from "../../types/disclosure-props";
import { ValidatedInput } from "../validated-input";
import { useContext } from "react";
import { RxDBContext } from "../../context/rxdb-context";
import type { DeviceDocType } from "../../rxdb/device";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";

export default function AddDeviceModal({
  isOpen,
  onClose,
  onOpenChange,
}: DisclosureProps) {
  const { t } = useTranslation();
  const { rxdb } = useContext(RxDBContext);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (device: Omit<DeviceDocType, "id">) => {
      console.log({
        id: uuid(),
        name: device.name,
        mac: device.mac,
        ip: device.ip || null,
      });
      await rxdb.devices.insert({
        id: uuid(),
        name: device.name,
        mac: device.mac,
        ip: device.ip || null,
      });
      queryClient.resetQueries({
        queryKey: ["DEVICES"],
      });
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      mac: "",
      ip: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      mac: yup
        .string()
        .matches(/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/, {
          message: "Invalid mac adress",
        })
        .required(),
      ip: yup
        .string()
        .matches(
          /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
          {
            message: "Invalid ip adress",
          }
        ),
    }),
    onSubmit(values) {
      mutate(values);
    },
  });

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
              {t("addDevice")}
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
                name="mac"
                label={t("macAddress")}
                classNames={{
                  inputWrapper: "shadow-none border border-divider",
                }}
              ></ValidatedInput>
              <ValidatedInput
                formik={formik}
                name="ip"
                label={t("ipAddressIOptional")}
                classNames={{
                  inputWrapper: "shadow-none border border-divider",
                }}
              ></ValidatedInput>
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
