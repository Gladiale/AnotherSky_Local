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
  cgShadow: boolean;
  characterShadow: boolean;
  iconShadow: boolean;
  cgSwing: boolean;
  loadingAnime: boolean;
};

export type { FilterDataType, AppOptionDataType };
