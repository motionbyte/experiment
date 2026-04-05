import type { RouteObject } from "react-router-dom";
import { AppShell } from "../shell/AppShell";
import { HomePage } from "../../pages/HomePage/HomePage";
import { HomeSectionPage } from "../../pages/HomeSectionPage";
import { AlbumSeoPage } from "../../pages/AlbumSeoPage/AlbumSeoPage";
import { ScorePage } from "../../pages/ScorePage/ScorePage";
import { ArtistSeoPage } from "../../pages/ArtistSeoPage/ArtistSeoPage";
import { BandMemberSeoPage } from "../../pages/BandMemberSeoPage/BandMemberSeoPage";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage";
import { RouteError } from "../errors/RouteError";

export const routes: RouteObject[] = [
  {
    path: "/score",
    element: <ScorePage />,
    errorElement: <RouteError />,
  },
  /** Same page — alternate slug for main-site URL (e.g. thelostsymbols.in/the-lost-symbols-score) */
  {
    path: "/the-lost-symbols-score",
    element: <ScorePage />,
    errorElement: <RouteError />,
  },
  {
    path: "/",
    element: <AppShell />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "album/:albumId", element: <AlbumSeoPage /> },
      { path: "artist/:artistId", element: <ArtistSeoPage /> },
      { path: "member/:memberId", element: <BandMemberSeoPage /> },
      { path: ":section", element: <HomeSectionPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

