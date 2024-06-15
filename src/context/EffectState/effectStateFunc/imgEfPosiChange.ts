import { EffectStateType } from "../effectStateInit";

const imgEfPosiChange = (
  state: EffectStateType,
  position: EffectStateType["imageEF"]["position"]
) => {
  return {
    ...state,
    imageEF: {
      ...state.imageEF,
      position: position,
    },
  };
};

export { imgEfPosiChange };
