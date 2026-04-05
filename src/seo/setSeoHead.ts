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
 * Sets document title, description, Open Graph, canonical URL, optional JSON-LD, and robots.
 * Use `robots: "noindex, nofollow"` for 404/error-only states.
 */
export function setSeoHead(args: {
  title: string;
  description: string;
  canonicalPath: string;
  jsonLd?: Record<string, unknown>;
  /** Default `index, follow`. */
  robots?: string;
}): void {
  document.title = args.title;
  setMetaByName("description", args.description);
  setMetaByName("robots", args.robots ?? "index, follow");
  setMetaByProperty("og:title", args.title);
  setMetaByProperty("og:description", args.description);
  setMetaByProperty("og:url", `${SITE_ORIGIN}${args.canonicalPath}`);
  setMetaByName("twitter:card", "summary_large_image");

  let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!linkCanonical) {
    linkCanonical = document.createElement("link");
    linkCanonical.setAttribute("rel", "canonical");
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute("href", `${SITE_ORIGIN}${args.canonicalPath}`);

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
