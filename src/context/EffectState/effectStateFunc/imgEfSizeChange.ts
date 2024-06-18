import { EffectStateType } from "../effectStateInit";

const imgEfSizeChange = (
  state: EffectStateType,
  size: EffectStateType["imageEF"]["size"]
): EffectStateType => {
  return {
    ...state,
    imageEF: {
      ...state.imageEF,
      size: size,
    },
  };
};

export { imgEfSizeChange };
