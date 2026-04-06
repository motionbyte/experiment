import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
  THEME_COLOR,
  absolutePublicUrl,
} from "./seoDefaults";
import { SITE_ORIGIN } from "./siteOrigin";

function setMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Sets document title, description, Open Graph, Twitter, canonical URL, optional JSON-LD, and robots.
 * Use `robots: "noindex, nofollow"` for 404/error-only states.
 */
export function setSeoHead(args: {
  title: string;
  description: string;
  canonicalPath: string;
  jsonLd?: Record<string, unknown>;
  /** Default `index, follow`. */
  robots?: string;
  /** Absolute image URL for sharing; defaults to site default OG image. */
  ogImage?: string;
  /** Open Graph type — default `website`; use `article` for news-style pages if needed. */
  ogType?: string;
  /** Optional comma-separated keywords (used on key landing pages). */
  keywords?: string;
}): void {
  const canonical = `${SITE_ORIGIN}${args.canonicalPath}`;
  const ogImageUrl = args.ogImage ?? absolutePublicUrl(DEFAULT_OG_IMAGE_PATH);
  const ogType = args.ogType ?? "website";

  document.title = args.title;
  setMetaByName("description", args.description);
  setMetaByName("author", SITE_NAME);
  setMetaByName("theme-color", THEME_COLOR);
  const prevKw = document.querySelector('meta[name="keywords"]');
  if (args.keywords) {
    setMetaByName("keywords", args.keywords);
  } else if (prevKw) {
    prevKw.remove();
  }
  setMetaByName("robots", args.robots ?? "index, follow");

  setMetaByProperty("og:type", ogType);
  setMetaByProperty("og:site_name", SITE_NAME);
  setMetaByProperty("og:locale", "en_IN");
  setMetaByProperty("og:title", args.title);
  setMetaByProperty("og:description", args.description);
  setMetaByProperty("og:url", canonical);
  setMetaByProperty("og:image", ogImageUrl);
  setMetaByProperty("og:image:alt", args.title);

  setMetaByName("twitter:card", "summary_large_image");
  setMetaByName("twitter:title", args.title);
  setMetaByName("twitter:description", args.description);
  setMetaByName("twitter:image", ogImageUrl);

  let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!linkCanonical) {
    linkCanonical = document.createElement("link");
    linkCanonical.setAttribute("rel", "canonical");
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute("href", canonical);

  const existing = document.getElementById("seo-jsonld");
  if (existing) existing.remove();
  if (args.jsonLd) {
    const script = document.createElement("script");
    script.id = "seo-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(args.jsonLd);
    document.head.appendChild(script);
  }
}
