/**
 * Film credits for The Lost Symbols Score portfolio.
 * Posters: themoviedb.org image CDN (public w500 URLs).
 * Prime links: regional detail pages as provided.
 */
export type ScoreFilm = {
  id: string;
  title: string;
  titleNative?: string;
  year: number;
  runtime: string;
  genres: string[];
  synopsis: string;
  director: string;
  producers: string[];
  cast: string[];
  studios: string[];
  /** IMDb user rating when known (e.g. from catalogue) */
  imdbRating?: string;
  imdbId: string;
  primeVideoUrl: string;
  posterUrl: string;
  /** Credited audio role — same for both films per brief */
  musicCredit: string;
};

const TLS_SCORE = "The Lost Symbols Score";

export const SCORE_FILMS: ScoreFilm[] = [
  {
    id: "chal-zindagi",
    title: "Chal Zindagi",
    titleNative: "चल ज़िंदगी",
    year: 2023,
    runtime: "2h 9m",
    genres: ["Adventure", "Drama", "Inspirational"],
    synopsis:
      "Strangers Sana, Sahil, Sada and Rana set out on a bike journey to Leh, Ladakh, each with their own purpose. Along the way, their outlook on life shifts—and the road leaves a lasting mark on them.",
    director: "Vivek Sharma",
    producers: ["Priyank Jain", "Vaibhav Panch", "Prakash Raka"],
    cast: [
      "Shannon K",
      "Sanjay Mishra",
      "Vivek Dahiya",
      "Mita Vashisht",
      "Vivaan Sharma",
      "Rakesh Pandey",
    ],
    studios: ["Vivaan Filmz Production", "Panorama Studios International Ltd."],
    imdbRating: "6.2",
    imdbId: "tt27425654",
    primeVideoUrl:
      "https://www.primevideo.com/-/hi/detail/%E0%A4%9A%E0%A4%B2-%E0%A4%9C%E0%A4%BF%E0%A4%82%E0%A4%A6%E0%A4%97%E0%A5%80/0GWLDG53WSMU2QEABZED343R3Z",
    posterUrl: "https://image.tmdb.org/t/p/w500/fu2fHbX0a99IfutCrWdWF5KgMrj.jpg",
    musicCredit: TLS_SCORE,
  },
  {
    id: "social-mandiya",
    title: "Social Mandiya",
    year: 2021,
    runtime: "1h 40m",
    genres: ["Comedy", "Drama", "Humorous"],
    synopsis:
      "Three friends with different goals want to get famous through social media. They begin with fake show-offs and silly posts, grab followers’ attention for a while—but it doesn’t last. As events unfold, they see their mistake and move toward a more honest path. A comic ride that mirrors the chaos of online life.",
    director: "Vivek Sharma",
    producers: ["Priyank Jain", "Vivek Sharma", "Ritika Sharma", "Shannon K"],
    cast: [
      "Vikalp Mehta",
      "Vivaan Sharma",
      "Nishant Kumar",
      "Sandeep Gaur",
      "Jai Roop Jeevan",
      "Trishna Singh",
      "Ruchita Sharma",
      "Jaishree Nagriwal",
      "Amit Sharma",
      "Rocky",
      "Narendra Arora",
      "Harinarayan",
    ],
    studios: ["Vivaan Filmz Production"],
    imdbId: "tt25399162",
    primeVideoUrl:
      "https://www.primevideo.com/-/pt_PT/detail/Social-Mandiya/0OKY44ZEZJ6DUD92BAIMRI6IH6",
    posterUrl: "https://image.tmdb.org/t/p/w500/qDju75opcui9Ha0hxcjsOu5GI9i.jpg",
    musicCredit: TLS_SCORE,
  },
];
