// 配列から型を生成
// 参考 https://zenn.dev/kazuwombat/articles/885794faa6b3c9
const mixBlendModeList = [
  "normal",
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

type MixBlendModeType = (typeof mixBlendModeList)[number];

type EffectStateType = {
  target: {
    cg: boolean;
    character: boolean;
    video: boolean;
  };

  pixel: boolean;
  mirror: boolean;

  shake: {
    active: boolean;
    heavy: "low" | "normal" | "high";
  };

  cgMix: {
    active: boolean;
    mixMode: MixBlendModeType;
  };

  // image-effect
  image: {
    active: boolean;
    zIndex: number;
    maxHeightFull: boolean;
    size: "contain" | "none" | "cover";
    mixMode: MixBlendModeType;
  };

  // 使ってない
  equip: {
    active: boolean;
    zIndex: number;
    filter: boolean;
    anime: string;
    mixMode: MixBlendModeType;
  };
};

const effectSateInit: EffectStateType = {
  target: {
    cg: false,
    character: false,
    video: false,
  },

  pixel: false,
  mirror: false,

  shake: {
    active: false,
    heavy: "low",
  },

  cgMix: {
    active: false,
    mixMode: "normal",
  },

  image: {
    active: false,
    zIndex: 0,
    maxHeightFull: false,
    size: "contain",
    mixMode: "normal",
  },

  equip: {
    active: false,
    zIndex: 0,
    filter: false,
    anime: "",
    mixMode: "normal",
  },
};

export { type EffectStateType, type MixBlendModeType, effectSateInit, mixBlendModeList };
