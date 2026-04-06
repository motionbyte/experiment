export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@thelostsymbols";
export const SUBSCRIBE_URL = `${YOUTUBE_CHANNEL_URL}?sub_confirmation=1`;

export type VideoItem = {
  id: string;
  title: string;
  date: string;
  /** Written here in the repo — not fetched from YouTube */
  description?: string;
};

export const youtubeWatchUrl = (id: string) =>
  `https://www.youtube.com/watch?v=${id}`;

export const youtubeEmbedUrl = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;

/** Order: newest first. All links verified. */
export const officialMusicVideos: VideoItem[] = [
  { id: "Jf4yeB-Fc-k", title: "Anantram", date: "2024-12-01", description: "" },
  { id: "Vd8RNh2LcxM", title: "Taara", date: "2024-08-01", description: "" },
  { id: "a0ohyXl116k", title: "Riha", date: "2024-04-01", description: "" },
  { id: "1xWhAY87sSo", title: "Mehfil e Bahar", date: "2023-11-01", description: "" },
  { id: "15MN6UGOQTU", title: "Narayana", date: "2023-06-01", description: "" },
  { id: "mJhJ_5Ro2y8", title: "Shaitan", date: "2023-02-01", description: "" },
  { id: "qMUGQOOcz9E", title: "Din Barkha (feat. Ravindra Upadhyay)", date: "2022-12-01", description: "" },
  { id: "nq7bNbkbnps", title: "Khuda", date: "2022-10-01", description: "" },
  { id: "M67rt2NKOag", title: "Chhoti Si", date: "2022-05-01", description: "" },
];
