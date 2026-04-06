import { SITE_ORIGIN } from "./siteOrigin";

export const SITE_NAME = "The Lost Symbols";

/** Default meta description — keep in sync with `index.html` and `homeAndSectionSeo`. */
export const DEFAULT_DESCRIPTION =
  "The Lost Symbols — Indian alternative rock from Jaipur, Rajasthan. Discography, film score collaborations, videos, and band story.";

/** Public file under `public/` used when a page does not set a specific share image. */
export const DEFAULT_OG_IMAGE_PATH = "/portfolio.png";

export const DEFAULT_KEYWORDS =
  "The Lost Symbols, Jaipur band, alternative rock India, Indian rock, Rajasthan music, The Lost Symbols Score, film score, discography";

/** Theme for browser UI (matches dark site shell). */
export const THEME_COLOR = "#0a0a0a";

/**
 * Absolute URL for a site path or external URL. Encodes path segments (spaces in `/assets/...`).
 */
export function absolutePublicUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_ORIGIN}${encodeURI(path)}`;
}
