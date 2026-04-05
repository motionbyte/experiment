/**
 * Sister venture destinations — replace with live URLs or set in .env:
 * VITE_SCORE_URL, VITE_VERSE_URL, VITE_BAND_URL
 */
const envScore = import.meta.env.VITE_SCORE_URL as string | undefined;
const envVerse = import.meta.env.VITE_VERSE_URL as string | undefined;
const envBand = import.meta.env.VITE_BAND_URL as string | undefined;

/** Default: same app, main domain path (override with VITE_SCORE_URL for another host) */
export const SCORE_URL = envScore?.trim() || "/score";

export const VERSE_URL =
  envVerse?.trim() || "https://example.com/the-lost-verse";

/** Main band site (defaults to app root — main site home) */
export const BAND_URL = envBand?.trim() || "/";
