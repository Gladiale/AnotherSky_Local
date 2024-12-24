import { type EffectStateType } from "../effectStateInit";

const changeImageSize = (
  state: EffectStateType,
  size: EffectStateType["image"]["size"]
): EffectStateType => {
  return {
    ...state,
    image: {
      ...state.image,
      size: size,
    },
  };
};

export { changeImageSize };
