type FilterDataType = {
  opacity: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  invert: number;
  saturate: number;
  sepia: number;
};

type AppOptionDataType = {
  loadingAnime: boolean;
  cgSwing: boolean;
  cgShadow: boolean;
  videoShadow: boolean;
  characterShadow: boolean;
  iconShadow: boolean;
};

export type { FilterDataType, AppOptionDataType };
