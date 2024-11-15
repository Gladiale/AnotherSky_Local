import { EffectStateType } from "../effectStateInit";

const shakeHeavyChange = (
  state: EffectStateType,
  heavy: EffectStateType["shakeEffect"]["heavy"]
): EffectStateType => {
  return {
    ...state,
    shakeEffect: {
      ...state.shakeEffect,
      heavy: heavy,
    },
  };
};

export { shakeHeavyChange };
