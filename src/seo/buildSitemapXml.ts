import { albums } from "../features/discography/discographyData";
import { bandMembers } from "../features/band-members/bandMembersData";
import { FEATURED_ARTISTS } from "../features/score-portfolio/featuredArtistsData";
import { SITE_ORIGIN } from "./siteOrigin";

const SECTION_PATHS: { path: string; changefreq: string; priority: string }[] = [
  { path: "/discography", changefreq: "weekly", priority: "0.95" },
  { path: "/biography", changefreq: "monthly", priority: "0.9" },
  { path: "/playlist", changefreq: "weekly", priority: "0.85" },
  { path: "/band", changefreq: "monthly", priority: "0.9" },
  { path: "/photos", changefreq: "weekly", priority: "0.85" },
  { path: "/videos", changefreq: "weekly", priority: "0.85" },
  { path: "/contact", changefreq: "monthly", priority: "0.85" },
  { path: "/ventures", changefreq: "monthly", priority: "0.8" },
];

function urlEntry(loc: string, changefreq: string, priority: string): string {
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

/** Single source for sitemap.xml — keep in sync with React routes. */
export function buildSitemapXml(): string {
  const lines: string[] = [];

  lines.push(urlEntry(`${SITE_ORIGIN}/`, "weekly", "1.0"));

  for (const s of SECTION_PATHS) {
    lines.push(urlEntry(`${SITE_ORIGIN}${s.path}`, s.changefreq, s.priority));
  }

  for (const a of albums) {
    lines.push(urlEntry(`${SITE_ORIGIN}/album/${a.id}`, "monthly", "0.8"));
  }

  lines.push(urlEntry(`${SITE_ORIGIN}/score`, "weekly", "0.9"));
  lines.push(urlEntry(`${SITE_ORIGIN}/the-lost-symbols-score`, "weekly", "0.85"));

  for (const artist of FEATURED_ARTISTS) {
    lines.push(urlEntry(`${SITE_ORIGIN}/artist/${artist.id}`, "monthly", "0.82"));
  }

  for (const m of bandMembers) {
    lines.push(urlEntry(`${SITE_ORIGIN}/member/${m.id}`, "monthly", "0.82"));
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<!-- Auto-generated at build from discography, featured artists, and band members -->
${lines.join("\n")}
</urlset>
`;
}
