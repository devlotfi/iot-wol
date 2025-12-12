import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
} from "@heroui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DisclosureProps } from "../../types/disclosure-props";
import type { DeviceDocType } from "../../rxdb/device";
import { ValidatedInput } from "../validated-input";
import { useContext } from "react";
import { RxDBContext } from "../../context/rxdb-context";

interface EditDeviceModalProps extends DisclosureProps {
  device: DeviceDocType;
}

export default function EditDeviceModal({
  device,
  isOpen,
  onClose,
  onOpenChange,
}: EditDeviceModalProps) {
  const { rxdb } = useContext(RxDBContext);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: Omit<DeviceDocType, "id">) => {
      console.log(values);
      const doc = await rxdb.devices.findOne(device.id).exec();
      if (!doc) return;
      await doc.incrementalModify((data) => {
        data.name = values.name;
        data.mac = values.mac;
        data.ip = values.ip || null;
        return data;
      });
      queryClient.resetQueries({
        queryKey: ["DEVICES"],
      });
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      name: device.name,
      mac: device.mac,
      ip: device.ip || "",
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
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-[1rem]"
          >
            <ModalHeader className="flex flex-col gap-1">
              Edit device
            </ModalHeader>
            <ModalBody>
              <ValidatedInput
                isRequired
                formik={formik}
                name="name"
                label="Name"
                placeholder="Device name"
              ></ValidatedInput>
              <ValidatedInput
                isRequired
                formik={formik}
                name="mac"
                label="Mac address"
                placeholder="00:1A:2B:3C:4D:5E"
              ></ValidatedInput>
              <ValidatedInput
                formik={formik}
                name="ip"
                label="IP address (Optional: for PING)"
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
                startContent={
                  <FontAwesomeIcon icon={faPenAlt}></FontAwesomeIcon>
                }
              >
                Edit
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
