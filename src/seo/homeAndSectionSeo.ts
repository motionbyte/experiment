import { setSeoHead } from "./setSeoHead";
import { SITE_ORIGIN } from "./siteOrigin";

const DEFAULT_DESCRIPTION =
  "The Lost Symbols — Indian alternative rock from Jaipur, Rajasthan. Discography, film score collaborations, videos, and band story.";

/** Index route `/` */
export function setHomeSeo(): void {
  setSeoHead({
    title: "The Lost Symbols — Alternative rock band from Jaipur",
    description: DEFAULT_DESCRIPTION,
    canonicalPath: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "The Lost Symbols",
      url: SITE_ORIGIN,
      description: DEFAULT_DESCRIPTION,
      publisher: {
        "@type": "MusicGroup",
        name: "The Lost Symbols",
        url: SITE_ORIGIN,
      },
    },
  });
}

const SECTION_COPY: Record<
  string,
  { title: string; description: string }
> = {
  discography: {
    title: "Discography — The Lost Symbols",
    description:
      "Albums and releases by The Lost Symbols — alternative rock, atmospheric production, and concept-based storytelling.",
  },
  biography: {
    title: "Biography — The Lost Symbols",
    description:
      "The Lost Symbols from Jaipur: alternative rock, cinematic textures, and narrative-driven music — band story and line-up context.",
  },
  playlist: {
    title: "Playlists — The Lost Symbols on Spotify",
    description:
      "Listen to The Lost Symbols on Spotify — playlists, releases, and artist playlists in one place.",
  },
  band: {
    title: "Band — The Lost Symbols members",
    description:
      "Meet the members of The Lost Symbols — vocals, guitars, drums, bass, and production from Jaipur’s alternative rock line-up.",
  },
  photos: {
    title: "Photos — The Lost Symbols",
    description:
      "Photo gallery and visuals from The Lost Symbols — live, press, and campaign imagery.",
  },
  videos: {
    title: "Videos — The Lost Symbols official music videos",
    description:
      "Official music videos and visual work from The Lost Symbols — subscribe on YouTube and follow on social platforms.",
  },
  contact: {
    title: "Contact — The Lost Symbols",
    description:
      "Connect with The Lost Symbols — bookings, collaborations, and general enquiries.",
  },
  ventures: {
    title: "Ventures — The Lost Symbols Score & more",
    description:
      "Other ventures from The Lost Symbols — film score (The Lost Symbols Score), The Lost Verse, and related projects.",
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
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: copy.title,
      url: `${SITE_ORIGIN}${path}`,
      description: copy.description,
      isPartOf: { "@type": "WebSite", name: "The Lost Symbols", url: SITE_ORIGIN },
    },
  });
}
