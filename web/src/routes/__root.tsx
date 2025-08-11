import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import MainNavbar from "../components/main-navbar";
import BottomTabs from "../components/bottom-tabs";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="flex min-h-dvh min-w-dvw max-h-dvh max-w-dvw flex-col bg-content2">
        <MainNavbar></MainNavbar>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <Outlet />
        </div>
        <BottomTabs></BottomTabs>
      </div>
    </React.Fragment>
  );
}
