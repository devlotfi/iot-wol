import {
  faBroadcastTower,
  faPlug,
  faPlugCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody } from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";
import ConnectionStatus from "../components/connection-status";
import { ValidatedInput } from "../components/validated-input";
import { useFormik } from "formik";
import * as yup from "yup";
import { useContext } from "react";
import { MqttContext } from "../context/mqtt-context";
import mqtt from "mqtt";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/connection")({
  component: RouteComponent,
});

function RouteComponent() {
  const { connectionData, setConnectionData } = useContext(MqttContext);

  const formik = useFormik({
    initialValues: {
      topic: connectionData.topic || "",
      acknowledgementTopic: connectionData.acknowledgementTopic || "",
      WOLPassword: connectionData.WOLPassword || "",
    },
    validationSchema: yup.object({
      topic: yup.string().required(),
      acknowledgementTopic: yup.string().required(),
      WOLPassword: yup.string().required(),
    }),
    async onSubmit(values, { setSubmitting }) {
      console.log(values);
      setSubmitting(true);
      if (connectionData.client) {
        await connectionData.client.endAsync();
      }
      const client = await mqtt.connect("wss://test.mosquitto.org:8081/mqtt", {
        reconnectPeriod: 1000,
      });

      setConnectionData((connectionData) => ({
        ...connectionData,
        client,
        isConnected: true,
        topic: values.topic,
        acknowledgementTopic: values.acknowledgementTopic,
        WOLPassword: values.WOLPassword,
      }));

      console.log("connected");

      setSubmitting(false);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (connectionData.client) {
        await connectionData.client.endAsync();

        setConnectionData((connectionData) => ({
          ...connectionData,
          client: null,
          isConnected: false,
        }));
      }
    },
  });

  return (
    <div className="flex flex-col flex-1 items-center px-[0.7rem]">
      <div className="flex flex-col flex-1 max-w-screen-md w-full pt-[3rem] gap-[1rem]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-[1rem] justify-between">
          <div className="flex gap-[0.5rem] items-center">
            <FontAwesomeIcon
              icon={faBroadcastTower}
              className="text-[18pt]"
            ></FontAwesomeIcon>
            <div className="flex text-[18pt] font-black">Connection</div>
          </div>

          <ConnectionStatus size="lg"></ConnectionStatus>
        </div>

        <Card shadow="sm">
          <CardBody>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-[1rem]"
            >
              <ValidatedInput
                formik={formik}
                name="topic"
                label="WOL Topic"
                placeholder="username/wol"
                isDisabled={connectionData.isConnected}
              ></ValidatedInput>
              <ValidatedInput
                formik={formik}
                name="acknowledgementTopic"
                label="Acknowledgement Topic"
                placeholder="username/wol/ack"
                isDisabled={connectionData.isConnected}
              ></ValidatedInput>
              <ValidatedInput
                formik={formik}
                name="WOLPassword"
                label="WOL Password"
                placeholder="Password"
                type="password"
                isDisabled={connectionData.isConnected}
              ></ValidatedInput>

              {connectionData.isConnected ? (
                <Button
                  type="button"
                  color="danger"
                  startContent={
                    <FontAwesomeIcon icon={faPlugCircleXmark}></FontAwesomeIcon>
                  }
                  isLoading={isPending}
                  onPress={() => mutate()}
                >
                  Disconnect
                </Button>
              ) : (
                <Button
                  type="submit"
                  color="primary"
                  startContent={
                    <FontAwesomeIcon icon={faPlug}></FontAwesomeIcon>
                  }
                  isLoading={formik.isSubmitting}
                >
                  Connect
                </Button>
              )}
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
