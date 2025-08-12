import * as React from "react";
import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import MainNavbar from "../components/main-navbar";
import BottomTabs from "../components/bottom-tabs";
import { Progress } from "@heroui/react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { isLoading } = useRouterState();

  return (
    <React.Fragment>
      <div className="flex min-h-dvh min-w-dvw max-h-dvh max-w-dvw flex-col bg-content2">
        {isLoading ? (
          <Progress isIndeterminate aria-label="Loading..." size="sm" />
        ) : null}
        <MainNavbar></MainNavbar>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <Outlet />
        </div>
        <BottomTabs></BottomTabs>
      </div>
    </React.Fragment>
  );
}
