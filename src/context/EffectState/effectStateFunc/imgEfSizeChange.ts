import { EffectStateType } from "../effectStateInit";

const imgEfSizeChange = (
  state: EffectStateType,
  size: EffectStateType["imageEF"]["size"]
) => {
  return {
    ...state,
    imageEF: {
      ...state.imageEF,
      size: size,
    },
  };
};

export { imgEfSizeChange };
