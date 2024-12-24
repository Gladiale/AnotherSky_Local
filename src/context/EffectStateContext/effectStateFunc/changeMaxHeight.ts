import { type EffectStateType } from "../effectStateInit";

const changeMaxHeight = (state: EffectStateType): EffectStateType => {
  return {
    ...state,
    image: {
      ...state["image"],
      maxHeightFull: !state["image"].maxHeightFull,
    },
  };
};

export { changeMaxHeight };
