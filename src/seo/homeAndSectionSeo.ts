import { DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS, SITE_NAME } from "./seoDefaults";
import { setSeoHead } from "./setSeoHead";
import { SITE_ORIGIN } from "./siteOrigin";

/** Index route `/` */
export function setHomeSeo(): void {
  setSeoHead({
    title: "The Lost Symbols — Alternative rock band from Jaipur",
    description: DEFAULT_DESCRIPTION,
    canonicalPath: "/",
    keywords: DEFAULT_KEYWORDS,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_ORIGIN,
      description: DEFAULT_DESCRIPTION,
      inLanguage: "en-IN",
      publisher: {
        "@type": "MusicGroup",
        "@id": `${SITE_ORIGIN}/#musicgroup`,
        name: SITE_NAME,
        url: SITE_ORIGIN,
        genre: ["Alternative rock", "Rock"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jaipur",
          addressRegion: "Rajasthan",
          addressCountry: "IN",
        },
      },
    },
  });
}

const SECTION_COPY: Record<
  string,
  { title: string; description: string; keywords?: string }
> = {
  discography: {
    title: "Discography — The Lost Symbols",
    description:
      "Albums and releases by The Lost Symbols — alternative rock, atmospheric production, and concept-based storytelling.",
    keywords:
      "The Lost Symbols albums, discography, Jaipur rock, alternative rock India, TAYSA, Gharq, Agnikund",
  },
  biography: {
    title: "Biography — The Lost Symbols",
    description:
      "The Lost Symbols from Jaipur: alternative rock, cinematic textures, and narrative-driven music — band story and line-up context.",
    keywords: "The Lost Symbols biography, Jaipur band, Indian alternative rock",
  },
  playlist: {
    title: "Playlists — The Lost Symbols on Spotify",
    description:
      "Listen to The Lost Symbols on Spotify — playlists, releases, and artist playlists in one place.",
    keywords: "The Lost Symbols Spotify, playlists, stream",
  },
  band: {
    title: "Band — The Lost Symbols members",
    description:
      "Meet the members of The Lost Symbols — vocals, guitars, drums, bass, and production from Jaipur’s alternative rock line-up.",
    keywords: "The Lost Symbols band members, line-up, Jaipur musicians",
  },
  photos: {
    title: "Photos — The Lost Symbols",
    description:
      "Photo gallery and visuals from The Lost Symbols — live, press, and campaign imagery.",
    keywords: "The Lost Symbols photos, gallery, live",
  },
  videos: {
    title: "Videos — The Lost Symbols official music videos",
    description:
      "Official music videos and visual work from The Lost Symbols — subscribe on YouTube and follow on social platforms.",
    keywords: "The Lost Symbols music videos, YouTube, official videos",
  },
  "press-releases": {
    title: "Press releases — The Lost Symbols",
    description:
      "Press coverage, media announcements, and news about The Lost Symbols — alternative rock from Jaipur.",
    keywords: "The Lost Symbols press, media, news",
  },
  contact: {
    title: "Contact — The Lost Symbols",
    description:
      "Connect with The Lost Symbols — bookings, collaborations, and general enquiries.",
    keywords: "The Lost Symbols contact, bookings",
  },
  ventures: {
    title: "Ventures — The Lost Symbols Score & more",
    description:
      "Other ventures from The Lost Symbols — film score (The Lost Symbols Score), The Lost Verse, and related projects.",
    keywords: "The Lost Symbols Score, The Lost Verse, film score Jaipur",
  },
};

/** Deep links like `/discography`, `/band`, etc. */
export function setSectionSeo(sectionId: string): void {
  const copy = SECTION_COPY[sectionId];
  if (!copy) {
    setHomeSeo();
    return;
  }
  const path = `/${sectionId}`;
  setSeoHead({
    title: copy.title,
    description: copy.description,
    canonicalPath: path,
    ...(copy.keywords ? { keywords: copy.keywords } : {}),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: copy.title,
      url: `${SITE_ORIGIN}${path}`,
      description: copy.description,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_ORIGIN,
      },
    },
  });
}
