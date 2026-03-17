export type BandMember = {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  story: string;
  gallery: string[];
};

export const bandMembers: BandMember[] = [
  {
    id: "aman-raj",
    name: "Aman Raj",
    role: "Lead vocalist, composer & lyricist",
    photoUrl: "/assets/aman raj.png",
    story: "Aman Raj is the lead vocalist, composer, and lyricist of The Lost Symbols. His work drives the band's conceptual and narrative direction, blending alternative rock with atmospheric storytelling. [Demo content — replace with full story and real photos.]",
    gallery: ["/assets/aman raj.png"],
  },
  {
    id: "gunjan-soral",
    name: "Gunjan Soral",
    role: "Lead guitar & production",
    photoUrl: "/assets/gunjan soral.png",
    story: "Gunjan Soral handles lead guitar and production for The Lost Symbols, shaping the band's sound and cinematic textures. [Demo content — replace with full story and real photos.]",
    gallery: ["/assets/gunjan soral.png"],
  },
  {
    id: "arun-singh-naruka",
    name: "Arun Singh Naruka",
    role: "Drums",
    photoUrl: "/assets/arunsingh naruka.png",
    story: "Arun Singh Naruka is the drummer of The Lost Symbols, anchoring the band's rhythm and dynamic range. [Demo content — replace with full story and real photos.]",
    gallery: ["/assets/arunsingh naruka.png"],
  },
  {
    id: "gaurang-patel",
    name: "Gaurang Patel",
    role: "Rhythm guitar",
    photoUrl: "/assets/gaurang.png",
    story: "Gaurang Patel plays rhythm guitar for The Lost Symbols, contributing to the band's layered sound and live presence. [Demo content — replace with full story and real photos.]",
    gallery: ["/assets/gaurang.png"],
  },
  {
    id: "akhil-sindhwani",
    name: "Akhil Sindhwani",
    role: "Bass",
    photoUrl: "/assets/akhilsindhwani.png",
    story: "Akhil Sindhwani is the bassist of The Lost Symbols, providing the low-end foundation and groove. [Demo content — replace with full story and real photos.]",
    gallery: ["/assets/akhilsindhwani.png"],
  },
];
