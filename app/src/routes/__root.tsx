import * as React from "react";
import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { Progress, ScrollShadow } from "@heroui/react";
import Sidebar from "../components/sidebar";
import BottomTabs from "../components/bottom-tabs";
import ConnectionStatus from "../components/connection/connection-status";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { isLoading } = useRouterState();

  return (
    <React.Fragment>
      {isLoading ? (
        <Progress
          isIndeterminate
          aria-label="Loading..."
          size="sm"
          className="fixed w-dvw z-50"
        />
      ) : null}

      <Sidebar></Sidebar>
      <ScrollShadow
        visibility="bottom"
        className="flex flex-col flex-1 h-[calc(100dvh-5rem)] md:h-auto md:w-[calc(100dvw-6rem)] overflow-x-hidden overflow-y-auto bg-[linear-gradient(to_top,hsl(var(--heroui-content1)/1)_0%,hsl(var(--heroui-content2)/1)_10%,hsl(var(--heroui-content2)/1)_100%)] md:bg-[linear-gradient(to_right,hsl(var(--heroui-content1)/1)_0%,hsl(var(--heroui-content2)/1)_10%,hsl(var(--heroui-content2)/1)_100%)]"
      >
        <ConnectionStatus></ConnectionStatus>
        <Outlet />
      </ScrollShadow>
      <BottomTabs></BottomTabs>
    </React.Fragment>
  );
}
