import "./i18n";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import {
  createHashHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import PWAProvider from "./provider/pwa-provider";
import { ThemeProvider } from "./provider/theme-provider";
import RxDBProvider from "./provider/rxdb-provider";
import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import NotFound from "./components/not-found";

const history = createHashHistory();

const router = createRouter({
  routeTree,
  history,
  defaultNotFoundComponent: NotFound,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

if (import.meta.env.MODE === "development") {
  addRxPlugin(RxDBDevModePlugin);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider placement="top-center" toastOffset={13}></ToastProvider>
      <QueryClientProvider client={queryClient}>
        <PWAProvider>
          <ThemeProvider>
            <RxDBProvider>
              <RouterProvider router={router}></RouterProvider>
            </RxDBProvider>
          </ThemeProvider>
        </PWAProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  </StrictMode>
);
