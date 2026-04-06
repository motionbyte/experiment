export type PressOutlet = "highonscore" | "rollingstone";

export type PressReleaseItem = {
  id: string;
  title: string;
  outlet: PressOutlet;
  outletLabel: string;
  publishedAt: string;
  excerpt: string;
  body: string;
  url: string;
};

/** Curated copy from each article; open original URL for full piece + layout. */
export const pressReleases: PressReleaseItem[] = [
  {
    id: "farogh-highonscore",
    title:
      "The Lost Symbols’ latest album ‘Farogh’ — bold steps and resplendent tracks",
    outlet: "highonscore",
    outletLabel: "High On Score",
    publishedAt: "2023-12-01",
    excerpt:
      "Score Indie Reviews on Farogh: eight tracks of rock and penchant lyrics in Urdu and Hindi, with standout moments like Din Barkha and experimental closers Test and Khwabeeda.",
    body: `The Lost Symbols is an Indian rock band founded in Jalandhar around 11 years ago but dissolved in 2015. Since 2019, they have been based in Jaipur and are back stronger with more amazing artists, traversing new genres and varied sounds. Their latest album, Farogh — meaning progress and advancement — symbolises their journey and the never-ending voyage of life.

Consisting of 8 tracks, this 44-minute music sensation is an amalgamation of rock music and penchant lyrics, sung especially in Urdu and Hindi, with interesting song names that carry deep meaning.

The review highlights Katleaam’s strong guitar riff and chorus, Anantram’s Bollywood-adjacent colour with Aman Raj’s vocals, Din Barkha’s soulful opening and Rajasthani touches, Maukaprasat’s heavier hard-rock tilt, and the experimental Test and Khwabeeda as culminating tracks — thoughtful lyrics where the music sometimes takes the foreground.

Overall, the album is praised as a bold step to merge distant genres into something that feels like a match made in heaven, with intelligent lyrics and innovative rock.`,
    url: "https://highonscore.com/the-lost-symbols-farogh-score-indie-reviews/",
  },
  {
    id: "khidkiyan-highonscore",
    title: "The Lost Symbols craft an anthem of hope with Khidkiyan",
    outlet: "highonscore",
    outletLabel: "High On Score",
    publishedAt: "2022-04-17",
    excerpt:
      "Score Indie Reviews: Khidkiyan’s five minutes of atmospheric richness, yearning for the eternal, and a 2000s soft-rock sensibility reminiscent of Indus Creed or Strings.",
    body: `Among today’s shorter-form listening habits, The Lost Symbols lean into about five minutes of atmospheric richness for Khidkiyan — true to their broader discography.

Lyrically, the song is a yearning for the eternal: prayers in darkness, silence from above, and the confusion on the path to enlightenment. The piece builds from gentle vocals toward a rousing interlude; the closing guitar work turns dramatic when the lyrics land.

The review notes a quintessentially 2000s rock sound — a welcome change when the indie scene has fewer strong soft-rock cuts — with repeatability and a clear message for fans and new listeners alike. Khidkiyan is part of the upcoming album GHARQ.

Verdict: enlightenment with confusion leads to an atmospheric track.`,
    url: "https://highonscore.com/the-lost-symbols-khidkiyan-score-indie-reviews/",
  },
  {
    id: "nadi-ka-rasta-rollingstone",
    title: "New Rock, Jazz and Metal You May Have Missed — featuring The Lost Symbols",
    outlet: "rollingstone",
    outletLabel: "Rolling Stone India",
    publishedAt: "2024-06-27",
    excerpt:
      "Rolling Stone India rounds up Septic Isle, Against Evil, The Lost Symbols (Nadi Ka Rasta), Madmast, Sei Hek, Pink Moss and more — with a dedicated paragraph on TLS’s fourth single.",
    body: `This roundup covers fresh cuts across Indian rock and metal — from instrumental prog and metalcore to Hindi rock and funk/soul.

On “Nadi Ka Rasta” by The Lost Symbols, the piece notes that on their fourth single from the upcoming album, the band opens with a pastoral acoustic approach. Intricate guitar leads over chords swell into string arrangements, with clear Nineties and early 2000s American rock influences while the band finds a more distinct sonic bracket — citing heavier tracks like Musibaton Ka Pahad and Shaitan and the interplay on Myna.

The article situates The Lost Symbols alongside the rest of the month’s notable releases in one editorial feature.`,
    url: "https://rollingstoneindia.com/new-rock-metal-songs-sei-hek-septic-isle-against-evil-madmast-the-lost-symbols/",
  },
  {
    id: "shaitan-rollingstone",
    title: "New Metal on Our Radar — The Lost Symbols’ “Shaitan” and more",
    outlet: "rollingstone",
    outletLabel: "Rolling Stone India",
    publishedAt: "2024-03-19",
    excerpt:
      "Rolling Stone India highlights recent metal from Astrit, Takatak, Coordinates, Mudrarakshas — and The Lost Symbols’ Shaitan, tied to album Taysa and an AI-aided video.",
    body: `The column surveys noteworthy Indian metal releases — from Hindustani-heavy Astrit and Lahore’s Takatak to prog from Coordinates and mythology-driven Mudrarakshas.

On “Shaitan” by The Lost Symbols, the text traces the band from Jalandhar in 2015 through restarts to a prolific streak since 2021 and debut The Diary, now Jaipur-based and preparing a fourth album in four years, Taysa. An AI-aided music video represents the heavier side, while the recent single Myna is described as more adorned with strings and prog songwriting.

The feature places Shaitan in a broader monthly metal roundup alongside peers across the country.`,
    url: "https://rollingstoneindia.com/new-metal-releases-astrit-takatak-coordinates-mudrarakshas/",
  },
];

export function formatPressDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
