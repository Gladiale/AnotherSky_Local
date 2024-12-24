import { type EffectStateType } from "../effectStateInit";

const changeActive1st = (
  state: EffectStateType,
  target: "pixel" | "mirror"
): EffectStateType => {
  return {
    ...state,
    [target]: !state[target],
  };
};

const changeActive2nd = (
  state: EffectStateType,
  target: "shake" | "cgMix" | "image" | "equip"
): EffectStateType => {
  return {
    ...state,
    [target]: {
      ...state[target],
      active: !state[target].active,
    },
  };
};

const changeActive = (
  state: EffectStateType,
  target: keyof Omit<EffectStateType, "target">
): EffectStateType => {
  switch (target) {
    case "pixel":
      return changeActive1st(state, target);
    case "mirror":
      return changeActive1st(state, target);
    case "shake":
      return changeActive2nd(state, target);
    case "cgMix":
      return changeActive2nd(state, target);
    case "image":
      return changeActive2nd(state, target);
    case "equip":
      return changeActive2nd(state, target);
    default:
      throw new Error("不明なActionです");
  }
};

export { changeActive };
