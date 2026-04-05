import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { HomePage } from "./HomePage/HomePage";

/** Must match section `id` attributes on the home page */
const SECTION_IDS = new Set([
  "discography",
  "biography",
  "playlist",
  "band",
  "photos",
  "videos",
  "contact",
  "ventures",
]);

/**
 * Routes like /discography so Google can index real URLs (not only #hash).
 */
export const HomeSectionPage: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  if (!section || !SECTION_IDS.has(section)) {
    return <Navigate to="/" replace />;
  }
  return <HomePage scrollTarget={section} />;
};
