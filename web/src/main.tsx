import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./provider/theme-provider.tsx";
import {
  createHashHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MqttProvider from "./provider/mqtt-provider.tsx";

const history = createHashHistory();

const router = createRouter({ routeTree, history });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MqttProvider>
            <RouterProvider router={router}></RouterProvider>
          </MqttProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  </StrictMode>
);
