export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@thelostsymbols";
export const SUBSCRIBE_URL = `${YOUTUBE_CHANNEL_URL}?sub_confirmation=1`;

export type VideoItem = {
  id: string;
  title: string;
  date: string;
};

/** Order: newest first. All links verified. */
export const officialMusicVideos: VideoItem[] = [
  { id: "Jf4yeB-Fc-k", title: "Anantram", date: "2024-12-01" },
  { id: "Vd8RNh2LcxM", title: "Taara", date: "2024-08-01" },
  { id: "a0ohyXl116k", title: "Riha", date: "2024-04-01" },
  { id: "1xWhAY87sSo", title: "Mehfil e Bahar", date: "2023-11-01" },
  { id: "15MN6UGOQTU", title: "Narayana", date: "2023-06-01" },
  { id: "mJhJ_5Ro2y8", title: "Shaitan", date: "2023-02-01" },
  { id: "qMUGQOOcz9E", title: "Din Barkha (feat. Ravindra Upadhyay)", date: "2022-12-01" },
  { id: "nq7bNbkbnps", title: "Khuda", date: "2022-10-01" },
  { id: "M67rt2NKOag", title: "Chhoti Si", date: "2022-05-01" },
];
