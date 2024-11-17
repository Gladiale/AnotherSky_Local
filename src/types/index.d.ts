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

type MediaStateType = {
  image: {
    deg: number;
    scale: number;
    position: { x: number; y: number };
    // パソコン用
    isEditMode: boolean;
    // スマホ用
    touchMode: "scaleMode" | "positionMode" | "rotateMod" | "closed";
  };
  effect: {
    deg: number;
    scale: number;
    position: { x: number; y: number };
    isEditMode: boolean;
    touchMode: "scaleMode" | "positionMode" | "rotateMod" | "closed";
  };
  video: {
    deg: number;
    scale: number;
    position: { x: number; y: number };
    isEditMode: boolean;
    touchMode: "scaleMode" | "positionMode" | "rotateMod" | "closed";
  };
};

export type { FilterDataType, AppOptionDataType, MediaStateType };
