import type { RouteObject } from "react-router-dom";
import { AppShell } from "../shell/AppShell";
import { HomePage } from "../../pages/HomePage/HomePage";
import { HomeSectionPage } from "../../pages/HomeSectionPage";
import { AlbumSeoPage } from "../../pages/AlbumSeoPage/AlbumSeoPage";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage";
import { RouteError } from "../errors/RouteError";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppShell />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "album/:albumId", element: <AlbumSeoPage /> },
      { path: ":section", element: <HomeSectionPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

