import { EffectStateType } from "../effectStateInit";

const imgEfMultiActive = (
  state: EffectStateType,
  actionKey: "openAll" | "closeAll"
): EffectStateType => {
  if (actionKey === "openAll") {
    return {
      ...state,
      imageEF: {
        ...state.imageEF,
        activeImage: true,
        activeBlend: false,
      },
    };
  }

  return {
    ...state,
    imageEF: {
      ...state.imageEF,
      activeImage: false,
      activeBlend: false,
    },
    pixelEffect: false,
    shakeEffect: {
      ...state.shakeEffect,
      active: false,
    },
  };
};

export { imgEfMultiActive };
