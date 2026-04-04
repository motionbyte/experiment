/** Har disc ke liye alag rang — black / neutral gray avoid */
export type VinylPalette = {
  mid: string;
  deep: string;
  edge: string;
  labelLight: string;
  labelDark: string;
};

export const VINYL_PALETTES: VinylPalette[] = [
  {
    mid: "#c43d5e",
    deep: "#7a2140",
    edge: "#4a1528",
    labelLight: "#5c2a45",
    labelDark: "#301020",
  },
  {
    mid: "#2eb8a8",
    deep: "#187a6e",
    edge: "#0d453e",
    labelLight: "#1e5c54",
    labelDark: "#0a2824",
  },
  {
    mid: "#8b5cf0",
    deep: "#5b32b8",
    edge: "#32186e",
    labelLight: "#4a3090",
    labelDark: "#201050",
  },
  {
    mid: "#e8913a",
    deep: "#a85a1e",
    edge: "#5c3010",
    labelLight: "#8a5018",
    labelDark: "#3d2008",
  },
  {
    mid: "#e056a0",
    deep: "#a03070",
    edge: "#601844",
    labelLight: "#802858",
    labelDark: "#401028",
  },
  {
    mid: "#3d9ae8",
    deep: "#1e6cb0",
    edge: "#0f3d68",
    labelLight: "#285a8a",
    labelDark: "#0c2840",
  },
  {
    mid: "#7cb832",
    deep: "#4f7818",
    edge: "#2d440c",
    labelLight: "#3d6018",
    labelDark: "#1c3008",
  },
];

export function vinylPaletteForIndex(index: number): VinylPalette {
  return VINYL_PALETTES[index % VINYL_PALETTES.length];
}
