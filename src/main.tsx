import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ClientSurfaceGuards } from "./app/guards/ClientSurfaceGuards";
import { CinematicViewport } from "./cinematic/CinematicViewport";
import "./index.css";
import { router } from "./app/router/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CinematicViewport>
      <ClientSurfaceGuards />
      <RouterProvider router={router} />
    </CinematicViewport>
  </StrictMode>
);
