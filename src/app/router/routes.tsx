import React from "react";
import type { RouteObject } from "react-router-dom";
import { AppShell } from "../shell/AppShell";
import { HomePage } from "../../pages/HomePage/HomePage";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage";
import { RouteError } from "../errors/RouteError";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppShell />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

