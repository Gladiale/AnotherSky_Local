// 配列から型を生成
// 参考 https://zenn.dev/kazuwombat/articles/885794faa6b3c9
const blendKindList = [
  "multiply",
  "color-burn",
  "soft-light",
  "overlay",
  "screen",
  "color-dodge",
  "luminosity",
  "hard-light",
  "plus-lighter",
  "exclusion",
  "difference",
] as const;

const imgPositionList = [
  "center",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;

type EffectStateType = {
  blendCG: {
    active: boolean;
  };
  imageEF: {
    activeImage: boolean;
    activeBlend: boolean;
    size: "contain" | "none" | "cover";
    position: (typeof imgPositionList)[number];
    blendKind: (typeof blendKindList)[number];
    maxHeightFull: boolean;
  };
  mirrorEffect: boolean;
  filterEffect: {
    targetCard: boolean;
    targetCharacter: boolean;
    targetVideo: boolean;
    dropShadow: boolean;
  };
  pixelEffect: boolean;
  shakeEffect: {
    active: boolean;
    heavy: "low" | "normal" | "high";
  };
};

const effectSateInit: EffectStateType = {
  blendCG: {
    active: false,
  },
  imageEF: {
    activeImage: false,
    activeBlend: false,
    size: "contain",
    position: "center",
    blendKind: "soft-light",
    maxHeightFull: false,
  },
  mirrorEffect: false,
  filterEffect: {
    targetCard: false,
    targetCharacter: false,
    targetVideo: false,
    dropShadow: false,
  },
  pixelEffect: false,
  shakeEffect: {
    active: false,
    heavy: "low",
  },
};

export { type EffectStateType, effectSateInit, blendKindList };
