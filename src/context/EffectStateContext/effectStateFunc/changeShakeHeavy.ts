import { type EffectStateType } from "../effectStateInit";

const changeShakeHeavy = (
  state: EffectStateType,
  heavy: EffectStateType["shake"]["heavy"]
): EffectStateType => {
  return {
    ...state,
    shake: {
      ...state.shake,
      heavy: heavy,
    },
  };
};

export { changeShakeHeavy };
