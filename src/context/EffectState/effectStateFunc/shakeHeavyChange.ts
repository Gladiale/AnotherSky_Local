import { EffectStateType } from "../effectStateInit";

const shakeHeavyChange = (
  state: EffectStateType,
  heavy: EffectStateType["shakeEffect"]["heavy"]
) => {
  return {
    ...state,
    shakeEffect: {
      ...state.shakeEffect,
      heavy: heavy,
    },
  };
};

export { shakeHeavyChange };
